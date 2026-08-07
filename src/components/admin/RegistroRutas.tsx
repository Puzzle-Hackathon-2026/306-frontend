import { useState } from 'react'
import { useRutasCompletadas } from '../../hooks/useRutasCompletadas'
import { useColonias } from '../../hooks/useColonias'

const RUTAS_POR_PAGINA = 12

function formatFecha(iso: string | null): string {
    if (!iso) return '--'
    return new Date(iso).toLocaleDateString('es-HN', { day: '2-digit', month: 'short' })
}

function formatHora(iso: string | null): string {
    if (!iso) return '--:--'
    return new Date(iso).toLocaleTimeString('es-HN', { hour: '2-digit', minute: '2-digit', hour12: false })
}

function formatDuracion(minutos: number | null): string {
    if (minutos == null) return '--'
    const horas = Math.floor(minutos / 60)
    const mins = minutos % 60
    return horas > 0 ? `${horas}h ${mins}min` : `${mins}min`
}

function formatDistancia(km: number | null): string {
    if (km == null) return '--'
    return `${km.toFixed(1)} km`
}

export default function RegistroRutas() {
    const { rutas, loading: loadingRutas } = useRutasCompletadas()
    const { colonias, loading: loadingColonias } = useColonias()
    const [pagina, setPagina] = useState(1)

    if (loadingRutas || loadingColonias) {
        return (
            <div className="border border-[#D4E0D9] rounded-xl p-5 bg-white">
                <h2 className="font-display text-[15px] font-700 text-[#111A14] mb-4">Registro de rutas completadas</h2>
                <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-10 bg-[#F0F4F1] rounded-lg animate-pulse" />
                    ))}
                </div>
            </div>
        )
    }

    const nombrePorColoniaId = new Map(colonias.map((c) => [c.id, c.nombre]))

    const totalPaginas = Math.max(1, Math.ceil(rutas.length / RUTAS_POR_PAGINA))
    const paginaActual = Math.min(pagina, totalPaginas)
    const inicio = (paginaActual - 1) * RUTAS_POR_PAGINA
    const rutasPagina = rutas.slice(inicio, inicio + RUTAS_POR_PAGINA)

    const irAPagina = (p: number) => setPagina(Math.min(Math.max(p, 1), totalPaginas))

    return (
        <div className="border border-[#D4E0D9] rounded-xl p-5 bg-white">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <h2 className="font-display text-[15px] font-700 text-[#111A14]">
                    Registro de rutas completadas
                    <span className="text-[11px] font-normal text-[#5A6B5E] ml-2">
                        ({rutas.length} en total)
                    </span>
                </h2>

                {totalPaginas > 1 && (
                    <div className="flex items-center gap-2 text-[11px]">
                        <button
                            onClick={() => irAPagina(paginaActual - 1)}
                            disabled={paginaActual === 1}
                            className="px-2.5 py-1 rounded-md border border-[#D4E0D9] font-semibold text-[#5A6B5E] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#F0F4F1] transition-colors"
                        >
                            ← Anterior
                        </button>
                        <span className="font-semibold text-[#111A14] px-1">
                            Página {paginaActual} de {totalPaginas}
                        </span>
                        <button
                            onClick={() => irAPagina(paginaActual + 1)}
                            disabled={paginaActual === totalPaginas}
                            className="px-2.5 py-1 rounded-md border border-[#D4E0D9] font-semibold text-[#5A6B5E] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#F0F4F1] transition-colors"
                        >
                            Siguiente →
                        </button>
                    </div>
                )}
            </div>

            <div className="space-y-2">
                {rutasPagina.map((ruta, i) => {
                    const zona = ruta.coloniaId
                        ? nombrePorColoniaId.get(ruta.coloniaId) ?? 'Zona desconocida'
                        : 'Sin zona'

                    return (
                        <div key={`${ruta.truckId}-${inicio + i}`} className="flex items-center gap-4 border border-[#D4E0D9] rounded-lg px-4 py-2.5 hover:bg-[#F8F9F8]">
                            <span className="text-[11px] text-[#5A6B5E] font-mono" style={{ minWidth: 48 }}>{formatFecha(ruta.horaFin)}</span>
                            <span className="text-[11px] text-[#5A6B5E] font-mono" style={{ minWidth: 40 }}>{formatHora(ruta.horaFin)}</span>
                            <span className="text-[11px] font-semibold text-[#16643A] font-mono" style={{ minWidth: 52 }}>{ruta.truckId}</span>
                            <span className="text-[12px] text-[#111A14] flex-1">{zona}</span>
                            <span className="text-[11px] text-[#5A6B5E] hidden sm:block">{formatDistancia(ruta.distanciaKm)}</span>
                            <span className="text-[11px] text-[#5A6B5E] hidden md:block">{formatDuracion(ruta.duracionMinutos)}</span>
                            <span className="text-[10px] px-2 py-0.5 bg-[#E8F2EC] text-[#16643A] rounded font-semibold">Completada</span>
                        </div>
                    )
                })}

                {rutasPagina.length === 0 && (
                    <p className="text-[12px] text-[#5A6B5E] text-center py-6">
                        No hay rutas completadas todavía.
                    </p>
                )}
            </div>
        </div>
    )
}
