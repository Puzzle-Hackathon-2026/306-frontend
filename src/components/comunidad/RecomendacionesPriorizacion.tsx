import { coloniasCobertura } from "../../data/comunidad";
import { getColorByIndice } from "../../lib/colorScale";

function calcularRecomendaciones() {
  return [...coloniasCobertura]
    .sort((a, b) => {
      const scoreA = (100 - a.indice) * 0.6 + a.reportes * 0.4;
      const scoreB = (100 - b.indice) * 0.6 + b.reportes * 0.4;
      return scoreB - scoreA;
    })
    .slice(0, 5);
}

export default function RecomendacionesPriorizacion() {
  const recomendaciones = calcularRecomendaciones();

  return (
    <div className="border border-[#D4E0D9] rounded-xl p-5 bg-white">
      <h2 className="font-display text-[15px] font-700 text-[#111A14] mb-1">
        Recomendación de priorización
      </h2>
      <p className="text-[11px] text-[#5A6B5E] mb-4">
        Colonias sugeridas para próximo despacho · criterio: tiempo sin servicio
        (60%) + incidencia de reportes (40%)
      </p>

      <div className="space-y-2">
        {recomendaciones.map((c, i) => (
          <div
            key={c.nombre}
            className="flex items-center gap-4 border border-[#D4E0D9] rounded-lg px-4 py-3 hover:bg-[#F8F9F8]"
          >
            <div
              className="w-7 h-7 rounded flex items-center justify-center font-800 text-[13px] flex-shrink-0 font-display"
              style={{
                backgroundColor:
                  i === 0 ? "#DC2626" : i === 1 ? "#E8920A" : "#5A6B5E",
                color: "#fff",
              }}
            >
              {i + 1}
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-semibold text-[#111A14]">
                {c.nombre}
              </div>
              <div className="text-[11px] text-[#5A6B5E]">
                {c.dias} días sin recolección · {c.reportes} reportes ·{" "}
                {c.poblacion.toLocaleString("es-HN")} habitantes
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div
                className="text-[11px] font-semibold"
                style={{ color: getColorByIndice(c.indice) }}
              >
                Índice {c.indice}
              </div>
              <div className="text-[10px] text-[#5A6B5E]">Atender hoy</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
