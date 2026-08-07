import { CircleMarker, Popup } from "react-leaflet";
import SanPedroMap from "./SanPedroMap";
import { useEstadoZonas, type EstadoZona } from "../../../hooks/useEstadoZonas";

const colorEstado: Record<EstadoZona, string> = {
    cubierta: "#16643A", // verde
    "en progreso": "#E8920A", // ámbar
    pendiente: "#2563EB", // azul
    "no programada": "#6B7B6E", // gris
};

const labelEstado: Record<EstadoZona, string> = {
    cubierta: "Cubierta",
    "en progreso": "En progreso",
    pendiente: "Pendiente",
    "no programada": "No programada",
};

// Con 276 colonias reales, no pintamos todas -- prioriza mismo criterio
// que el grid: actividad de hoy primero, luego lo más crítico.
const MAX_MARCADORES = 60;

export default function MapaCoberturaLeaflet() {
    const { zonas, loading, error } = useEstadoZonas();

    if (loading) {
        return (
            <div className="w-full h-[420px] rounded-lg bg-[#F0F4F1] animate-pulse flex items-center justify-center text-[#5A6B5E] text-[13px]">
                Cargando mapa de cobertura...
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-[420px] rounded-lg bg-[#FEF2F2] flex items-center justify-center text-[#DC2626] text-[13px]">
                No se pudo cargar el mapa de cobertura.
            </div>
        );
    }

    const zonasOrdenadas = [...zonas].sort((a, b) => {
        const prioridad = (e: EstadoZona) => (e === 'cubierta' || e === 'en progreso' ? 0 : 1);
        const diff = prioridad(a.estado) - prioridad(b.estado);
        return diff !== 0 ? diff : a.indice - b.indice;
    });
    const zonasMostradas = zonasOrdenadas.slice(0, MAX_MARCADORES);

    return (
        <div>
            <SanPedroMap>
                {zonasMostradas.map((c) => (
                    <CircleMarker
                        key={c.coloniaId}
                        center={[c.lat, c.lng]}
                        radius={9}
                        pathOptions={{
                            color: colorEstado[c.estado],
                            fillColor: colorEstado[c.estado],
                            fillOpacity: 0.85,
                            weight: 2,
                        }}
                    >
                        <Popup>
                            <div className="text-[12px]">
                                <div className="font-semibold text-[#111A14]">{c.nombre}</div>
                                <div
                                    style={{ color: colorEstado[c.estado] }}
                                    className="font-semibold"
                                >
                                    {labelEstado[c.estado]}
                                </div>
                                <div className="text-[#5A6B5E]">
                                    Índice: {c.indice} · {c.diasSinRecoleccion} días sin recolección
                                </div>
                            </div>
                        </Popup>
                    </CircleMarker>
                ))}
            </SanPedroMap>

            <div className="flex flex-wrap gap-3 mt-3 text-[10px] text-[#5A6B5E]">
                {(Object.keys(colorEstado) as EstadoZona[]).map((estado) => (
                    <span key={estado} className="flex items-center gap-1.5">
                        <span
                            className="w-2.5 h-2.5 rounded-full inline-block"
                            style={{ backgroundColor: colorEstado[estado] }}
                        />
                        {labelEstado[estado]}
                    </span>
                ))}
                <span className="text-[#B0BDB5]">
                    Mostrando {zonasMostradas.length} de {zonas.length} zonas
                </span>
            </div>
        </div>
    );
}