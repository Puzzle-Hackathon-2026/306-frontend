import { useCobertura } from './useCobertura'
import { useColonias } from './useColonias'
import { useTruckPositions } from './useTruckPositions'

export type EstadoZona = 'cubierta' | 'en progreso' | 'pendiente' | 'no programada'

export interface ZonaConEstado {
    coloniaId: string
    nombre: string
    lat: number
    lng: number
    estado: EstadoZona
    indice: number
    diasSinRecoleccion: number
}

// JS getDay(): 0=Domingo...6=Sábado. Nuestro sistema usa 1=Lunes...7=Domingo.
function isoDeHoy(): number {
    const dia = new Date().getDay()
    return dia === 0 ? 7 : dia
}

export function useEstadoZonas() {
    const { colonias: cobertura, loading: loadingCobertura, error: errorCobertura } = useCobertura()
    const { colonias: coloniasInfo, loading: loadingColonias, error: errorColonias } = useColonias()
    const { camiones, loading: loadingCamiones, error: errorCamiones } = useTruckPositions()

    const loading = loadingCobertura || loadingColonias || loadingCamiones
    const error = errorCobertura || errorColonias || errorCamiones

    if (loading || error) {
        return { zonas: [] as ZonaConEstado[], loading, error }
    }

    const hoy = isoDeHoy()
    const infoPorId = new Map(coloniasInfo.map((c) => [c.id, c]))
    const coloniasConCamionActivo = new Set(
        camiones
            .filter((c) => c.coloniaId && (c.estado === 'activo' || c.estado === 'pausa'))
            .map((c) => c.coloniaId)
    )

    function calcularEstado(coloniaId: string, diasSinRecoleccion: number): EstadoZona {
        if (diasSinRecoleccion === 0) return 'cubierta'
        if (coloniasConCamionActivo.has(coloniaId)) return 'en progreso'
        const programadaHoy = infoPorId.get(coloniaId)?.diasRecoleccionIso.includes(hoy) ?? false
        return programadaHoy ? 'pendiente' : 'no programada'
    }

    const zonas: ZonaConEstado[] = cobertura
        .map((c) => {
            const info = infoPorId.get(c.coloniaId)
            if (!info) return null
            return {
                coloniaId: c.coloniaId,
                nombre: c.nombre,
                lat: info.lat,
                lng: info.lng,
                estado: calcularEstado(c.coloniaId, c.diasSinRecoleccion),
                indice: c.indice,
                diasSinRecoleccion: c.diasSinRecoleccion,
            }
        })
        .filter((z): z is ZonaConEstado => z !== null)

    return { zonas, loading, error }
}