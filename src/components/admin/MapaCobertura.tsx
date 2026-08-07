import { useCobertura } from '../../hooks/useCobertura'
import { useColonias } from '../../hooks/useColonias'
import { useTruckPositions } from '../../hooks/useTruckPositions'

type EstadoMapa = 'cubierta' | 'en progreso' | 'pendiente' | 'no programada'

const colorEstado: Record<EstadoMapa, string> = {
    cubierta: '#16643A',
    'en progreso': '#E8920A',
    pendiente: '#D4E0D9',
    'no programada': '#F0F4F1',
}

const leyenda: { color: string; label: string }[] = [
    { color: '#16643A', label: 'Cubierta' },
    { color: '#E8920A', label: 'En progreso' },
    { color: '#D4E0D9', label: 'Pendiente' },
    { color: '#F0F4F1', label: 'No programada' },
]

// Con 276 colonias reales, mostramos solo las más relevantes para la demo:
// primero las que tienen actividad hoy (cubiertas/en progreso), luego las más críticas.
const MAX_COLONIAS_MOSTRADAS = 24

// JS getDay(): 0=Domingo...6=Sábado. Nuestro sistema usa 1=Lunes...7=Domingo.
function isoDeHoy(): number {
    const dia = new Date().getDay()
    return dia === 0 ? 7 : dia
}

export default function MapaCobertura() {
    const { colonias: cobertura, loading: loadingCobertura } = useCobertura()
    const { colonias: coloniasInfo, loading: loadingColonias } = useColonias()
    const { camiones, loading: loadingCamiones } = useTruckPositions()

    if (loadingCobertura || loadingColonias || loadingCamiones) {
        return (
            <div className="border border-[#D4E0D9] rounded-xl p-5 bg-white">
                <h2 className="font-display text-[15px] font-700 text-[#111A14] mb-4">Mapa de cobertura</h2>
                <div className="grid grid-cols-3 gap-1.5">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="h-10 bg-[#F0F4F1] rounded-md animate-pulse" />
                    ))}
                </div>
            </div>
        )
    }

    const hoy = isoDeHoy()
    const diasIsoPorColoniaId = new Map(coloniasInfo.map((c) => [c.id, c.diasRecoleccionIso]))
    const coloniasConCamionActivo = new Set(
        camiones
            .filter((c) => c.coloniaId && (c.estado === 'activo' || c.estado === 'pausa'))
            .map((c) => c.coloniaId)
    )

    function calcularEstado(coloniaId: string, diasSinRecoleccion: number): EstadoMapa {
        if (diasSinRecoleccion === 0) return 'cubierta'
        if (coloniasConCamionActivo.has(coloniaId)) return 'en progreso'
        const programadaHoy = diasIsoPorColoniaId.get(coloniaId)?.includes(hoy) ?? false
        return programadaHoy ? 'pendiente' : 'no programada'
    }

    const zonasConEstado = cobertura.map((c) => ({
        nombre: c.nombre,
        estado: calcularEstado(c.coloniaId, c.diasSinRecoleccion),
        indice: c.indice,
    }))

    // Prioriza mostrar lo que tiene actividad hoy, luego lo más crítico
    const zonasOrdenadas = [...zonasConEstado].sort((a, b) => {
        const prioridad = (e: EstadoMapa) => (e === 'cubierta' || e === 'en progreso' ? 0 : 1)
        const diffPrioridad = prioridad(a.estado) - prioridad(b.estado)
        if (diffPrioridad !== 0) return diffPrioridad
        return a.indice - b.indice
    })

    const zonasMostradas = zonasOrdenadas.slice(0, MAX_COLONIAS_MOSTRADAS)

    return (
        <div className="border border-[#D4E0D9] rounded-xl p-5 bg-white">
            <h2 className="font-display text-[15px] font-700 text-[#111A14] mb-4">
                Mapa de cobertura
                <span className="text-[11px] font-normal text-[#5A6B5E] ml-2">
                    ({zonasMostradas.length} de {zonasConEstado.length} zonas)
                </span>
            </h2>
            <div className="grid grid-cols-3 gap-1.5 mb-4">
                {zonasMostradas.map((zona) => (
                    <div
                        key={zona.nombre}
                        className="rounded-md p-1.5 text-center text-[9px] font-semibold leading-tight"
                        style={{
                            backgroundColor: colorEstado[zona.estado] + (zona.estado === 'cubierta' ? '' : '33'),
                            color: zona.estado === 'cubierta' ? '#fff' : zona.estado === 'en progreso' ? '#E8920A' : '#6B7B6E',
                            border: `1px solid ${colorEstado[zona.estado]}66`,
                        }}
                    >
                        {zona.nombre}
                    </div>
                ))}
            </div>
            <div className="border-t border-[#D4E0D9] pt-3 grid grid-cols-2 gap-1">
                {leyenda.map((l) => (
                    <div key={l.label} className="flex items-center gap-1.5 text-[10px] text-[#5A6B5E]">
                        <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ backgroundColor: l.color }} />
                        {l.label}
                    </div>
                ))}
            </div>
        </div>
    )
}