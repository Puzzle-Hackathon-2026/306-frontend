import { useCobertura } from "../../hooks/useCobertura";
import { getColorByIndice, getBgByIndice } from "../../lib/colorScale";

const MAX_COLONIAS_MOSTRADAS = 30

export default function MapaBrechas() {
    const { colonias, loading, error } = useCobertura()

    if (loading) {
        return (
            <div className="border border-[#D4E0D9] rounded-xl p-5 bg-white">
                <h2 className="font-display text-[15px] font-700 text-[#111A14] mb-4">Mapa de brechas</h2>
                <div className="grid grid-cols-3 gap-1.5">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="h-14 bg-[#F0F4F1] rounded-md animate-pulse" />
                    ))}
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="border border-[#D4E0D9] rounded-xl p-5 bg-white text-[12px] text-[#DC2626]">
                No se pudo cargar el mapa de brechas.
            </div>
        )
    }

    const ordenadas = [...colonias].sort((a, b) => a.indice - b.indice)
    const mostradas = ordenadas.slice(0, MAX_COLONIAS_MOSTRADAS)

    return (
        <div className="border border-[#D4E0D9] rounded-xl p-5 bg-white">
            <h2 className="font-display text-[15px] font-700 text-[#111A14] mb-1">
                Mapa de brechas
                <span className="text-[11px] font-normal text-[#5A6B5E] ml-2">
                    (las {mostradas.length} peores de {colonias.length})
                </span>
            </h2>
            <p className="text-[11px] text-[#5A6B5E] mb-4">
                Índice de cobertura por zona — menor es peor
            </p>

            <div className="grid grid-cols-3 gap-1.5">
                {mostradas.map((c) => (
                    <div
                        key={c.coloniaId}
                        className="rounded-md p-2 text-center border"
                        style={{
                            backgroundColor: getBgByIndice(c.indice),
                            borderColor: getColorByIndice(c.indice) + "44",
                        }}
                    >
                        <div className="text-[9px] font-semibold text-[#5A6B5E] leading-tight mb-1">
                            {c.nombre.replace("Barrio ", "B. ").replace("Colonia ", "Col. ")}
                        </div>
                        <div
                            className="font-display text-[18px] font-800 leading-none"
                            style={{ color: getColorByIndice(c.indice) }}
                        >
                            {c.indice}
                        </div>
                        <div className="text-[8px] text-[#5A6B5E] mt-0.5">/100</div>
                    </div>
                ))}
            </div>

            <div className="mt-4 flex items-center justify-between text-[10px] text-[#5A6B5E]">
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
