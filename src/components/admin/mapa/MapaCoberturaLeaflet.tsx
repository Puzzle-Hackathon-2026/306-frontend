import { CircleMarker, Popup } from "react-leaflet";
import SanPedroMap from "./SanPedroMap";
import { useEstadoZonas, type EstadoZona } from "../../../hooks/useEstadoZonas";

const colorEstado: Record<EstadoZona, string> = {
  cubierta: "#16A34A", // Verde
  "en progreso": "#FACC15", // Amarillo
  pendiente: "#EF4444", // Rojo
  "no programada": "#9CA3AF", // Gris
};

const labelEstado: Record<EstadoZona, string> = {
  cubierta: "Cubierta",
  "en progreso": "En progreso",
  pendiente: "Pendiente",
  "no programada": "No programada",
};

const MAX_MARCADORES = 60;

export default function MapaCoberturaLeaflet() {
  const { zonas, loading, error } = useEstadoZonas();

  if (loading) {
    return (
      <div className="w-full h-[620px] rounded-xl bg-[#F3F6F4] flex items-center justify-center text-[#5A6B5E]">
        Cargando mapa...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[620px] rounded-xl bg-red-50 flex items-center justify-center text-red-600">
        No se pudo cargar el mapa.
      </div>
    );
  }

  const zonasOrdenadas = [...zonas].sort((a, b) => {
    const prioridad = (e: EstadoZona) =>
      e === "cubierta" || e === "en progreso" ? 0 : 1;

    const diff = prioridad(a.estado) - prioridad(b.estado);

    return diff !== 0 ? diff : a.indice - b.indice;
  });

  const zonasMostradas = zonasOrdenadas.slice(0, MAX_MARCADORES);

  return (
    <SanPedroMap>
      {zonasMostradas.map((c) => (
        <CircleMarker
          key={c.coloniaId}
          center={[c.lat, c.lng]}
          radius={10}
          pathOptions={{
            color: "#FFFFFF",
            weight: 2,
            fillColor: colorEstado[c.estado],
            fillOpacity: 0.95,
          }}
        >
          <Popup>
            <div className="min-w-[180px]">
              <h3 className="font-semibold text-[#111A14]">{c.nombre}</h3>

              <div
                className="font-semibold mt-2"
                style={{ color: colorEstado[c.estado] }}
              >
                ● {labelEstado[c.estado]}
              </div>

              <div className="text-sm text-[#5A6B5E] mt-2">
                <p>
                  Índice de prioridad:
                  <strong> {c.indice}</strong>
                </p>

                <p>
                  Días sin recolección:
                  <strong> {c.diasSinRecoleccion}</strong>
                </p>
              </div>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </SanPedroMap>
  );
}
