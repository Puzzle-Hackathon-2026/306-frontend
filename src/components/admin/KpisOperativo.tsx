import { useTruckPositions } from '../../hooks/useTruckPositions'
import { useReportes } from '../../hooks/useReportes'
import { useCobertura } from '../../hooks/useCobertura'

const DIAS_UMBRAL_ZONA_CRITICA = 5

export default function KpisOperativo() {
    const { camiones, loading: loadingCamiones } = useTruckPositions()
    const { reportes, loading: loadingReportes } = useReportes()
    const { colonias, loading: loadingColonias } = useCobertura()

    if (loadingCamiones || loadingReportes || loadingColonias) {
        return (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="border border-[#D4E0D9] rounded-xl p-4 bg-white animate-pulse h-24" />
                ))}
            </div>
        )
    }

    const activos = camiones.filter((c) => c.estado === 'activo').length
    const conIncidente = camiones.filter((c) => c.estado === 'incidente').length
    const fueraDeRuta = camiones.filter((c) => c.estado === 'fuera_de_ruta').length

    const reportesActivos = reportes.filter(
        (r) => r.estado === 'pendiente' || r.estado === 'en_proceso'
    )
    const reportesAltaUrgencia = reportesActivos.filter((r) => r.urgencia === 'alta').length

    const cubiertasHoy = colonias.filter((c) => c.diasSinRecoleccion === 0).length
    const coberturaPct = colonias.length > 0
        ? Math.round((cubiertasHoy / colonias.length) * 100)
        : 0

    const zonasCriticas = colonias.filter(
        (c) => c.diasSinRecoleccion > DIAS_UMBRAL_ZONA_CRITICA
    ).length

    const kpis = [
        {
            label: 'Cobertura del día',
            value: `${coberturaPct}%`,
            sub: `${cubiertasHoy} de ${colonias.length} zonas`,
            color: '#16643A',
        },
        {
            label: 'Camiones activos',
            value: `${activos}/${camiones.length}`,
            sub: `${conIncidente} con incidente · ${fueraDeRuta} fuera de ruta`,
            color: '#E8920A',
        },
        {
            label: 'Reportes activos',
            value: `${reportesActivos.length}`,
            sub: `${reportesAltaUrgencia} de alta urgencia hoy`,
            color: '#DC2626',
        },
        {
            label: 'Zonas críticas',
            value: `${zonasCriticas}`,
            sub: `Más de ${DIAS_UMBRAL_ZONA_CRITICA} días sin servicio`,
            color: '#7C3AED',
        },
    ]

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {kpis.map((kpi) => (
                <div key={kpi.label} className="border border-[#D4E0D9] rounded-xl p-4 bg-white">
                    <div className="text-[11px] font-semibold tracking-wider text-[#5A6B5E] uppercase mb-2">{kpi.label}</div>
                    <div className="font-display text-3xl font-800 leading-none" style={{ color: kpi.color }}>{kpi.value}</div>
                    <div className="text-[11px] text-[#5A6B5E] mt-1.5">{kpi.sub}</div>
                </div>
            ))}
        </div>
    )
}