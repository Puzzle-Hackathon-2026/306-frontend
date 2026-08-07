import { coloniasCobertura, DIAS_UMBRAL_DESATENCION } from '../../data/comunidad'

export default function CoberturaKPIs() {
  const desatendidas = coloniasCobertura.filter((c) => c.dias >= DIAS_UMBRAL_DESATENCION)

  const kpis = [
    { label: 'Colonias desatendidas', value: `${desatendidas.length}`, sub: `Más de ${DIAS_UMBRAL_DESATENCION} días sin servicio`, color: '#DC2626' },
    { label: 'Índice promedio', value: '55', sub: 'De 100 en toda la ciudad', color: '#E8920A' },
    { label: 'Zona más crítica', value: 'Col. Miraflores', sub: '10 días sin recolección', color: '#7C3AED', small: true },
    { label: 'Reportes en brechas', value: `${desatendidas.reduce((a, c) => a + c.reportes, 0)}`, sub: 'En colonias críticas hoy', color: '#DC2626' },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {kpis.map((kpi) => (
        <div key={kpi.label} className="border border-[#D4E0D9] rounded-xl p-4 bg-white">
          <div className="text-xs font-semibold tracking-wider text-[#5A6B5E] uppercase mb-2">{kpi.label}</div>
          <div
            className="font-display font-800 leading-tight"
            style={{ color: kpi.color, fontSize: kpi.small ? 16 : 30 }}
          >
            {kpi.value}
          </div>
          <div className="text-xs text-[#5A6B5E] mt-1.5">{kpi.sub}</div>
        </div>
      ))}
    </div>
  )
}
