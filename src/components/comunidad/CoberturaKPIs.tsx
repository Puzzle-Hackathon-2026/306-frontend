import { useCobertura } from '../../hooks/useCobertura'

const DIAS_UMBRAL_DESATENCION = 5

export default function CoberturaKPIs() {
    const { colonias, loading, error } = useCobertura()

    if (loading) {
        return (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="border border-[#D4E0D9] rounded-xl p-4 bg-white animate-pulse h-24" />
                ))}
            </div>
        )
    }

    if (error || colonias.length === 0) {
        return (
            <div className="border border-[#D4E0D9] rounded-xl p-4 bg-white text-[12px] text-[#DC2626]">
                No se pudo cargar el índice de cobertura.
            </div>
        )
    }

    const desatendidas = colonias.filter((c) => c.diasSinRecoleccion >= DIAS_UMBRAL_DESATENCION)

    const indicePromedio = Math.round(
        colonias.reduce((acc, c) => acc + c.indice, 0) / colonias.length
    )

    const zonaMasCritica = [...colonias].sort((a, b) => a.indice - b.indice)[0]

    const reportesEnBrechas = desatendidas.reduce((acc, c) => acc + c.reportesActivos, 0)

    const kpis = [
        {
            label: 'Colonias desatendidas',
            value: `${desatendidas.length}`,
            sub: `Más de ${DIAS_UMBRAL_DESATENCION} días sin servicio`,
            color: '#DC2626',
        },
        {
            label: 'Índice promedio',
            value: `${indicePromedio}`,
            sub: 'De 100 en toda la ciudad',
            color: '#E8920A',
        },
        {
            label: 'Zona más crítica',
            value: zonaMasCritica.nombre,
            sub: `${zonaMasCritica.diasSinRecoleccion} días sin recolección`,
            color: '#7C3AED',
            small: true,
        },
        {
            label: 'Reportes en brechas',
            value: `${reportesEnBrechas}`,
            sub: 'En colonias críticas hoy',
            color: '#DC2626',
        },
    ]

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {kpis.map((kpi) => (
                <div key={kpi.label} className="border border-[#D4E0D9] rounded-xl p-4 bg-white">
                    <div className="text-[11px] font-semibold tracking-wider text-[#5A6B5E] uppercase mb-2">{kpi.label}</div>
                    <div
                        className="font-display font-800 leading-tight"
                        style={{ color: kpi.color, fontSize: kpi.small ? 16 : 30 }}
                    >
                        {kpi.value}
                    </div>
                    <div className="text-[11px] text-[#5A6B5E] mt-1.5">{kpi.sub}</div>
                </div>
            ))}
        </div>
    )
}