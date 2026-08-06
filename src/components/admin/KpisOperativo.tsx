import { camiones, reportesOperativos, coloniasMapaOperativo } from '../../data/operativo'

export default function KpisOperativo() {
  const activos = camiones.filter((c) => c.estado === 'activo').length
  const pendientes = reportesOperativos.filter((r) => r.estado === 'pendiente').length
  const cubiertas = coloniasMapaOperativo.filter((c) => c.estado === 'cubierta').length
  const coberturaPct = Math.round((cubiertas / coloniasMapaOperativo.length) * 100)

  const kpis = [
    { label: 'Cobertura del día', value: `${coberturaPct}%`, sub: `${cubiertas} de ${coloniasMapaOperativo.length} zonas`, color: '#16643A' },
    { label: 'Camiones activos', value: `${activos}/8`, sub: '1 con incidente · 1 fuera de ruta', color: '#E8920A' },
    { label: 'Reportes activos', value: `${pendientes}`, sub: '2 de alta urgencia hoy', color: '#DC2626' },
    { label: 'Zonas críticas', value: '3', sub: 'Más de 5 días sin servicio', color: '#7C3AED' },
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
