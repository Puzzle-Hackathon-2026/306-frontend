import { useCobertura } from '../../hooks/useCobertura'
import { getColorByIndice, getBgByIndice } from '../../lib/colorScale'

const DIAS_UMBRAL_DESATENCION = 5
const MAX_ALERTAS_MOSTRADAS = 12

export default function AlertasZonas() {
    const { colonias, loading, error } = useCobertura()

    if (loading) {
        return (
            <div className="border border-[#D4E0D9] rounded-xl p-5 bg-white">
                <h2 className="font-display text-[15px] font-700 text-[#111A14] mb-4">Alertas — zonas desatendidas</h2>
                <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-14 bg-[#F0F4F1] rounded-lg animate-pulse" />
                    ))}
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="border border-[#D4E0D9] rounded-xl p-5 bg-white text-[12px] text-[#DC2626]">
                No se pudieron cargar las alertas de cobertura.
            </div>
        )
    }

    const desatendidas = colonias
        .filter((c) => c.diasSinRecoleccion >= DIAS_UMBRAL_DESATENCION)
        .sort((a, b) => b.diasSinRecoleccion - a.diasSinRecoleccion)
        .slice(0, MAX_ALERTAS_MOSTRADAS)

    return (
        <div className="border border-[#D4E0D9] rounded-xl p-5 bg-white">
            <h2 className="font-display text-[15px] font-700 text-[#111A14] mb-1">Alertas — zonas desatendidas</h2>
            <p className="text-[11px] text-[#5A6B5E] mb-4">
                Colonias con más de {DIAS_UMBRAL_DESATENCION} días sin recolección
            </p>

            {desatendidas.length === 0 ? (
                <p className="text-[12px] text-[#5A6B5E] text-center py-6">Ninguna colonia está desatendida ahora mismo.</p>
            ) : (
                <div className="space-y-2">
                    {desatendidas.map((c) => (
                        <div
                            key={c.coloniaId}
                            className="flex items-center gap-3 rounded-lg p-3 border"
                            style={{ backgroundColor: getBgByIndice(c.indice), borderColor: getColorByIndice(c.indice) + '44' }}
                        >
                            <div
                                className="w-8 h-8 rounded-md flex items-center justify-center font-800 text-[13px] flex-shrink-0 font-display"
                                style={{ backgroundColor: getColorByIndice(c.indice), color: '#fff' }}
                            >
                                {c.diasSinRecoleccion}d
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-[12px] font-semibold text-[#111A14] truncate">{c.nombre}</div>
                                <div className="text-[10px] text-[#5A6B5E]">
                                    {(c.poblacionEstimada ?? 0).toLocaleString('es-HN')} hab · {c.reportesActivos} reportes activos
                                </div>
                            </div>
                            <div className="text-[10px] text-right flex-shrink-0">
                                <div className="font-bold" style={{ color: getColorByIndice(c.indice) }}>Índice {c.indice}</div>
                                <div className="text-[#5A6B5E]">
                                    Últ: {c.diasSinRecoleccion === 0 ? 'hoy' : `hace ${c.diasSinRecoleccion}d`}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
