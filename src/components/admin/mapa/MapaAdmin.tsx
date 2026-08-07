import { useState } from "react";
import MapaCoberturaLeaflet from "./MapaCoberturaLeaflet";
import MapaReportesLeaflet from "./MapaReportesLeaflet";

type VistaMapa = "cobertura" | "reportes";

const opciones: { id: VistaMapa; label: string }[] = [
  { id: "cobertura", label: "Cobertura por zona" },
  { id: "reportes", label: "Reportes" },
];

/**
 * Dos capas separadas (cobertura / reportes) en vez de una sola con todo
 * junto, para no saturar el mapa de pines de distinto tipo a la vez.
 */
export default function MapaAdmin() {
  const [vista, setVista] = useState<VistaMapa>("cobertura");

  return (
    <div className="border border-[#D4E0D9] rounded-xl p-5 bg-white">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div>
          <h2 className="font-display text-[15px] font-700 text-[#111A14]">
            Mapa de la ciudad
          </h2>
          <p className="text-[11px] text-[#5A6B5E]">
            San Pedro Sula — vista en tiempo real
          </p>
        </div>
        <div className="flex gap-1">
          {opciones.map((o) => (
            <button
              key={o.id}
              onClick={() => setVista(o.id)}
              className={`text-[11px] px-3 py-1.5 rounded-md font-semibold transition-colors ${
                vista === o.id
                  ? "bg-[#16643A] text-white"
                  : "bg-[#F0F4F1] text-[#5A6B5E] hover:bg-[#E8F2EC]"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {vista === "cobertura" ? (
        <MapaCoberturaLeaflet />
      ) : (
        <MapaReportesLeaflet />
      )}
    </div>
  );
}
