import { CircleMarker, Popup } from "react-leaflet";
import SanPedroMap from "./SanPedroMap";
import {
  coloniasMapaOperativo,
  type EstadoMapa,
} from "../../../data/operativo";

// Propuesta de color por estado — cámbialos si no te convencen.
const colorEstado: Record<EstadoMapa, string> = {
  cubierta: "#16643A", // verde
  "en progreso": "#E8920A", // ámbar
  pendiente: "#2563EB", // azul
  "no programada": "#6B7B6E", // gris
};

const labelEstado: Record<EstadoMapa, string> = {
  cubierta: "Cubierta",
  "en progreso": "En progreso",
  pendiente: "Pendiente",
  "no programada": "No programada",
};

export default function MapaCoberturaLeaflet() {
  return (
    <div>
      <SanPedroMap>
        {coloniasMapaOperativo.map((c) => (
          <CircleMarker
            key={c.nombre}
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
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </SanPedroMap>

      <div className="flex flex-wrap gap-3 mt-3 text-[10px] text-[#5A6B5E]">
        {(Object.keys(colorEstado) as EstadoMapa[]).map((estado) => (
          <span key={estado} className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full inline-block"
              style={{ backgroundColor: colorEstado[estado] }}
            />
            {labelEstado[estado]}
          </span>
        ))}
      </div>
    </div>
  );
}
