import { CircleMarker, Popup } from "react-leaflet";
import SanPedroMap from "./SanPedroMap";
import {
  reportesOperativos,
  type EstadoReporte,
} from "../../../data/operativo";

const colorEstado: Record<EstadoReporte, string> = {
  pendiente: "#2563EB",
  "en atención": "#E8920A",
  resuelto: "#16643A",
};

const radioPorUrgencia = { alta: 11, media: 8, baja: 6 } as const;

export default function MapaReportesLeaflet() {
  return (
    <div>
      <SanPedroMap>
        {reportesOperativos.map((r) => (
          <CircleMarker
            key={r.id}
            center={[r.lat, r.lng]}
            radius={radioPorUrgencia[r.urgencia]}
            pathOptions={{
              color: colorEstado[r.estado],
              fillColor: colorEstado[r.estado],
              fillOpacity: 0.85,
              weight: 2,
            }}
          >
            <Popup>
              <div className="text-sm space-y-0.5">
                <div className="font-semibold text-[#111A14]">{r.tipo}</div>
                <div className="text-[#5A6B5E]">
                  {r.zona} · {r.hora}
                </div>
                <div
                  style={{ color: colorEstado[r.estado] }}
                  className="font-semibold capitalize"
                >
                  {r.estado}
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </SanPedroMap>

      <div className="flex flex-wrap gap-3 mt-3 text-xs text-[#5A6B5E]">
        {(Object.keys(colorEstado) as EstadoReporte[]).map((estado) => (
          <span key={estado} className="flex items-center gap-1.5 capitalize">
            <span
              className="w-2.5 h-2.5 rounded-full inline-block"
              style={{ backgroundColor: colorEstado[estado] }}
            />
            {estado}
          </span>
        ))}
      </div>
    </div>
  );
}
