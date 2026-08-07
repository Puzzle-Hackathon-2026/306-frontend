import { CircleMarker, Popup } from "react-leaflet";
import SanPedroMap from "./SanPedroMap";
import { useReportes } from "../../../hooks/useReportes";

type EstadoReal = "pendiente" | "en_proceso" | "resuelto";

const colorEstado: Record<EstadoReal, string> = {
  pendiente: "#EF4444",
  en_proceso: "#E8920A",
  resuelto: "#16643A",
};

const labelEstado: Record<EstadoReal, string> = {
  pendiente: "Pendiente",
  en_proceso: "En atención",
  resuelto: "Resuelto",
};

const labelCategoria: Record<string, string> = {
  camion_no_paso: "Camión no pasó",
  basurero_desbordado: "Basurero desbordado",
  basura_acumulada: "Basura acumulada",
  botadero_ilegal: "Botadero ilegal",
  recoleccion_omitida: "Recolección omitida",
};

const radioPorUrgencia: Record<string, number> = {
  alta: 11,
  media: 8,
  baja: 6,
};

function formatHora(iso: string): string {
  return new Date(iso).toLocaleTimeString("es-HN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export default function MapaReportesLeaflet() {
  const { reportes, loading, error } = useReportes();

  if (loading) {
    return (
      <div className="w-full h-[520px] lg:h-[620px] rounded-lg bg-[#F0F4F1] animate-pulse flex items-center justify-center text-[#5A6B5E] text-[13px]">
        Cargando mapa de reportes...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[520px] lg:h-[620px] rounded-lg bg-[#FEF2F2] flex items-center justify-center text-[#DC2626] text-[13px]">
        No se pudo cargar el mapa de reportes.
      </div>
    );
  }

  return (
    <div>
      <SanPedroMap>
        {reportes.map((r) => {
          const estado = r.estado as EstadoReal;
          const urgencia = r.urgencia ?? "media";
          return (
            <CircleMarker
              key={r.id}
              center={[r.lat, r.lng]}
              radius={radioPorUrgencia[urgencia] ?? 8}
              pathOptions={{
                color: colorEstado[estado],
                fillColor: colorEstado[estado],
                fillOpacity: 0.85,
                weight: 2,
              }}
            >
              <Popup>
                <div className="text-[12px] space-y-0.5">
                  <div className="font-semibold text-[#111A14]">
                    {labelCategoria[r.categoria] ?? r.categoria}
                  </div>
                  <div className="text-[#5A6B5E]">
                    {r.coloniaNombre ?? "Sin zona"} · {formatHora(r.createdAt)}
                  </div>
                  <div
                    style={{ color: colorEstado[estado] }}
                    className="font-semibold"
                  >
                    {labelEstado[estado]}
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </SanPedroMap>
    </div>
  );
}
