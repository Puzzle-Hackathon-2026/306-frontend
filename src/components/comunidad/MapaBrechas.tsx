import { coloniasCobertura } from "../../data/comunidad";
import { getColorByIndice, getBgByIndice } from "../../lib/colorScale";

export default function MapaBrechas() {
  const ordenadas = [...coloniasCobertura].sort((b, a) => b.indice - a.indice);

  return (
    <div className="border border-[#D4E0D9] rounded-xl p-5 bg-white">
      <h2 className="font-display text-md font-700 text-[#111A14] mb-1">
        Mapa de brechas
      </h2>
      <p className="text-xs text-[#5A6B5E] mb-4">
        Índice de cobertura por zona — menor es peor
      </p>

      <div className="grid grid-cols-3 gap-1.5">
        {ordenadas.map((c) => (
          <div
            key={c.nombre}
            className="rounded-md p-2 text-center border"
            style={{
              backgroundColor: getBgByIndice(c.indice),
              borderColor: getColorByIndice(c.indice) + "44",
            }}
          >
            <div className="text-2xs font-semibold text-[#5A6B5E] leading-tight mb-1">
              {c.nombre.replace("Barrio ", "B. ").replace("Col. ", "")}
            </div>
            <div
              className="font-display text-lg font-800 leading-none"
              style={{ color: getColorByIndice(c.indice) }}
            >
              {c.indice}
            </div>
            <div className="text-2xs text-[#5A6B5E] mt-0.5">/100</div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-[#5A6B5E]">
        <div className="flex items-center gap-2">
          {[
            { color: "#16643A", label: "75+" },
            { color: "#E8920A", label: "30–50" },
            { color: "#DC2626", label: "<15" },
          ].map((l) => (
            <span key={l.label} className="flex items-center gap-1">
              <span
                className="w-2.5 h-2.5 rounded-sm"
                style={{ backgroundColor: l.color }}
              />
              {l.label}
            </span>
          ))}
        </div>
        <span>Índice de cobertura</span>
      </div>
    </div>
  );
}
