import { useState } from 'react'
import { useReportes, actualizarEstadoReporte, type Reporte } from '../../hooks/useReportes'

type EstadoReal = 'pendiente' | 'en_proceso' | 'resuelto'

const cfgEstado: Record<EstadoReal, { color: string; bg: string; label: string }> = {
    pendiente: { color: '#2563EB', bg: '#EFF6FF', label: 'Pendiente' },
    en_proceso: { color: '#E8920A', bg: '#FEF3E2', label: 'En atención' },
    resuelto: { color: '#16643A', bg: '#E8F2EC', label: 'Resuelto' },
}

const labelCategoria: Record<string, string> = {
    camion_no_paso: 'Camión no pasó',
    basurero_desbordado: 'Basurero desbordado',
    basura_acumulada: 'Basura acumulada',
    botadero_ilegal: 'Botadero ilegal',
    recoleccion_omitida: 'Recolección omitida',
}

const siguienteEstado: Record<EstadoReal, EstadoReal> = {
    pendiente: 'en_proceso',
    en_proceso: 'resuelto',
    resuelto: 'resuelto', // ya no avanza más
}

const filtros: ('todos' | EstadoReal)[] = ['todos', 'pendiente', 'en_proceso', 'resuelto']

function formatHora(iso: string): string {
    return new Date(iso).toLocaleTimeString('es-HN', { hour: '2-digit', minute: '2-digit', hour12: false })
}

export default function ReportesCiudadanos() {
    const { reportes, loading, error, refetch } = useReportes()
    const [filtro, setFiltro] = useState<'todos' | EstadoReal>('todos')
    const [actualizando, setActualizando] = useState<string | null>(null)

    const filtrados = filtro === 'todos' ? reportes : reportes.filter((r) => r.estado === filtro)

    async function handleAvanzarEstado(r: Reporte) {
        const estadoActual = r.estado as EstadoReal
        if (estadoActual === 'resuelto') return // ya no hay a dónde avanzar

        setActualizando(r.id)
        try {
            await actualizarEstadoReporte(r.id, siguienteEstado[estadoActual])
            await refetch()
        } catch (err) {
            console.error('Error al actualizar estado:', err)
        } finally {
            setActualizando(null)
        }
    }

    if (loading) {
        return (
            <div className="border border-[#D4E0D9] rounded-xl p-5 bg-white">
                <h2 className="font-display text-[15px] font-700 text-[#111A14] mb-4">Reportes ciudadanos</h2>
                <div className="space-y-2">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-8 bg-[#F0F4F1] rounded animate-pulse" />
                    ))}
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="border border-[#D4E0D9] rounded-xl p-5 bg-white">
                <h2 className="font-display text-[15px] font-700 text-[#111A14] mb-4">Reportes ciudadanos</h2>
                <p className="text-[12px] text-[#DC2626]">No se pudieron cargar los reportes. {error}</p>
            </div>
        )
    }

    return (
        <div className="border border-[#D4E0D9] rounded-xl p-5 bg-white">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <h2 className="font-display text-[15px] font-700 text-[#111A14]">Reportes ciudadanos</h2>
                <div className="flex gap-1.5">
                    {filtros.map((f) => (
                        <button
                            key={f}
                            onClick={() => setFiltro(f)}
                            className={`text-[11px] px-2.5 py-1 rounded-md font-semibold transition-colors capitalize ${filtro === f ? 'bg-[#16643A] text-white' : 'bg-[#F0F4F1] text-[#5A6B5E] hover:bg-[#E8F2EC]'
                                }`}
                        >
                            {f === 'todos' ? 'Todos' : cfgEstado[f].label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-[12px]">
                    <thead>
                        <tr className="border-b border-[#D4E0D9]">
                            {['ID', 'Tipo', 'Zona', 'Hora', 'Urgencia', 'Estado'].map((h) => (
                                <th key={h} className="text-left text-[10px] font-semibold tracking-wider text-[#5A6B5E] uppercase py-2 pr-4">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filtrados.map((r) => {
                            const estado = r.estado as EstadoReal
                            const cfg = cfgEstado[estado]
                            const urgColor = r.urgencia === 'alta' ? '#DC2626' : r.urgencia === 'media' ? '#E8920A' : '#5A6B5E'
                            const idCorto = r.id.slice(0, 8)

                            return (
                                <tr key={r.id} className="border-b border-[#F0F4F1] hover:bg-[#F8F9F8]">
                                    <td className="py-2.5 pr-4 font-semibold text-[#111A14] font-mono" style={{ fontSize: 11 }}>#{idCorto}</td>
                                    <td className="py-2.5 pr-4 text-[#111A14]">{labelCategoria[r.categoria] ?? r.categoria}</td>
                                    <td className="py-2.5 pr-4 text-[#5A6B5E]">{r.coloniaNombre ?? 'Sin zona'}</td>
                                    <td className="py-2.5 pr-4 text-[#5A6B5E] font-mono" style={{ fontSize: 11 }}>{formatHora(r.createdAt)}</td>
                                    <td className="py-2.5 pr-4">
                                        <span className="font-semibold capitalize" style={{ color: urgColor }}>{r.urgencia ?? 'media'}</span>
                                    </td>
                                    <td className="py-2.5">
                                        <button
                                            onClick={() => handleAvanzarEstado(r)}
                                            disabled={estado === 'resuelto' || actualizando === r.id}
                                            title={estado === 'resuelto' ? 'Reporte ya resuelto' : 'Clic para avanzar al siguiente estado'}
                                            className="text-[11px] px-2 py-0.5 rounded font-semibold capitalize disabled:cursor-default enabled:cursor-pointer enabled:hover:opacity-75 transition-opacity"
                                            style={{ backgroundColor: cfg.bg, color: cfg.color }}
                                        >
                                            {actualizando === r.id ? '...' : cfg.label}
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {filtrados.length === 0 && (
                    <p className="text-[12px] text-[#5A6B5E] text-center py-6">No hay reportes en este filtro.</p>
                )}
            </div>
        </div>
    )
}