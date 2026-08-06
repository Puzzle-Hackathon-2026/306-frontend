import { useState } from 'react'

const camiones = [
  { id: 'CAM-01', conductor: 'José Álvarez', zona: 'Barrio El Centro', estado: 'activo', progreso: 78, inicio: '06:00', reportes: 0 },
  { id: 'CAM-02', conductor: 'Mario Hernández', zona: 'Col. Las Palmas', estado: 'activo', progreso: 42, inicio: '07:30', reportes: 1 },
  { id: 'CAM-03', conductor: 'Roberto Cruz', zona: 'Col. Trejo', estado: 'activo', progreso: 91, inicio: '06:30', reportes: 0 },
  { id: 'CAM-04', conductor: 'Luis Aguilar', zona: 'Barrio Cabañas', estado: 'en pausa', progreso: 55, inicio: '08:00', reportes: 2 },
  { id: 'CAM-05', conductor: 'Carlos Flores', zona: 'Col. Villa del Sol', estado: 'activo', progreso: 30, inicio: '07:00', reportes: 0 },
  { id: 'CAM-06', conductor: 'Pedro Mejía', zona: 'Barrio Guamilito', estado: 'con incidente', progreso: 67, inicio: '06:00', reportes: 3 },
  { id: 'CAM-07', conductor: 'Ángel Torres', zona: 'Col. Los Andes', estado: 'activo', progreso: 20, inicio: '09:00', reportes: 0 },
  { id: 'CAM-08', conductor: 'Juan Medina', zona: 'Barrio Suyapa', estado: 'fuera de ruta', progreso: 0, inicio: '—', reportes: 1 },
]

const reportes = [
  { id: '#0041', tipo: 'Basura acumulada', zona: 'Col. Miraflores', hora: '07:15', estado: 'resuelto', urgencia: 'baja' },
  { id: '#0042', tipo: 'Punto ilegal de disposición', zona: 'Barrio Guamilito', hora: '08:02', estado: 'en atención', urgencia: 'alta' },
  { id: '#0043', tipo: 'Camión no pasó', zona: 'Col. La Hacienda', hora: '08:45', estado: 'pendiente', urgencia: 'media' },
  { id: '#0044', tipo: 'Desbordamiento de contenedor', zona: 'Barrio Cabañas', hora: '09:10', estado: 'en atención', urgencia: 'alta' },
  { id: '#0045', tipo: 'Basura acumulada', zona: 'Col. Universitaria', hora: '09:33', estado: 'pendiente', urgencia: 'media' },
  { id: '#0046', tipo: 'Camión no pasó', zona: 'Col. Alameda', hora: '10:05', estado: 'pendiente', urgencia: 'baja' },
  { id: '#0047', tipo: 'Punto ilegal de disposición', zona: 'Col. Moderna', hora: '10:22', estado: 'pendiente', urgencia: 'alta' },
]

const rutas = [
  { fecha: '06 ago', hora: '13:45', camion: 'CAM-03', zona: 'Col. Trejo', distancia: '18.4 km', duracion: '4h 20min' },
  { fecha: '06 ago', hora: '12:30', camion: 'CAM-01', zona: 'Barrio El Centro', distancia: '12.1 km', duracion: '3h 10min' },
  { fecha: '05 ago', hora: '14:00', camion: 'CAM-02', zona: 'Col. Las Palmas', distancia: '15.7 km', duracion: '3h 45min' },
  { fecha: '05 ago', hora: '13:20', camion: 'CAM-05', zona: 'Col. Villa del Sol', distancia: '20.2 km', duracion: '5h 00min' },
  { fecha: '05 ago', hora: '11:00', camion: 'CAM-07', zona: 'Col. Los Andes', distancia: '9.8 km', duracion: '2h 30min' },
]

const coloniasMapa = [
  { nombre: 'B. El Centro', estado: 'cubierta' },
  { nombre: 'Col. Trejo', estado: 'cubierta' },
  { nombre: 'B. Guamilito', estado: 'cubierta' },
  { nombre: 'Col. V. del Sol', estado: 'cubierta' },
  { nombre: 'Col. Las Palmas', estado: 'en progreso' },
  { nombre: 'B. Cabañas', estado: 'en progreso' },
  { nombre: 'B. Suyapa', estado: 'pendiente' },
  { nombre: 'Col. Los Andes', estado: 'en progreso' },
  { nombre: 'Col. Miraflores', estado: 'pendiente' },
  { nombre: 'Col. El Prado', estado: 'pendiente' },
  { nombre: 'Col. Universitaria', estado: 'pendiente' },
  { nombre: 'Col. Moderna', estado: 'pendiente' },
  { nombre: 'Col. La Hacienda', estado: 'pendiente' },
  { nombre: 'Col. Alameda', estado: 'no programada' },
  { nombre: 'Col. Jardines', estado: 'no programada' },
]

const estadoCamion = {
  activo: { color: '#16643A', bg: '#E8F2EC', label: 'Activo' },
  'en pausa': { color: '#E8920A', bg: '#FEF3E2', label: 'En pausa' },
  'con incidente': { color: '#DC2626', bg: '#FEF2F2', label: 'Con incidente' },
  'fuera de ruta': { color: '#6B7B6E', bg: '#F0F4F1', label: 'Fuera de ruta' },
}

const estadoReporte = {
  pendiente: { color: '#2563EB', bg: '#EFF6FF' },
  'en atención': { color: '#E8920A', bg: '#FEF3E2' },
  resuelto: { color: '#16643A', bg: '#E8F2EC' },
}

const estadoMapa = {
  cubierta: '#16643A',
  'en progreso': '#E8920A',
  pendiente: '#D4E0D9',
  'no programada': '#F0F4F1',
}

export default function PanelOperativo() {
  const [filtroReporte, setFiltroReporte] = useState<'todos' | 'pendiente' | 'en atención' | 'resuelto'>('todos')

  const reportesFiltrados = filtroReporte === 'todos'
    ? reportes
    : reportes.filter((r) => r.estado === filtroReporte)

  const activosCount = camiones.filter(c => c.estado === 'activo').length
  const reportesPendientes = reportes.filter(r => r.estado === 'pendiente').length
  const cubiertasCount = coloniasMapa.filter(c => c.estado === 'cubierta').length
  const coberturaPct = Math.round((cubiertasCount / coloniasMapa.length) * 100)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-[11px] font-semibold tracking-widest text-[#5A6B5E] uppercase mb-1">Vista 02 · Operativo</p>
        <h1 style={{ fontFamily: "'Outfit', sans-serif" }} className="text-3xl font-800 text-[#111A14] leading-none">
          Panel de operaciones
        </h1>
        <p className="text-[13px] text-[#5A6B5E] mt-1">
          Miércoles 6 de agosto, 2026 · 10:28 hrs
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Cobertura del día', value: `${coberturaPct}%`, sub: `${cubiertasCount} de ${coloniasMapa.length} zonas`, color: '#16643A' },
          { label: 'Camiones activos', value: `${activosCount}/8`, sub: '1 con incidente · 1 fuera de ruta', color: '#E8920A' },
          { label: 'Reportes activos', value: `${reportesPendientes}`, sub: '2 de alta urgencia hoy', color: '#DC2626' },
          { label: 'Zonas críticas', value: '3', sub: 'Más de 5 días sin servicio', color: '#7C3AED' },
        ].map((kpi) => (
          <div key={kpi.label} className="border border-[#D4E0D9] rounded-xl p-4 bg-white">
            <div className="text-[11px] font-semibold tracking-wider text-[#5A6B5E] uppercase mb-2">{kpi.label}</div>
            <div style={{ fontFamily: "'Outfit', sans-serif", color: kpi.color }} className="text-3xl font-800 leading-none">
              {kpi.value}
            </div>
            <div className="text-[11px] text-[#5A6B5E] mt-1.5">{kpi.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mapa de cobertura */}
        <div className="border border-[#D4E0D9] rounded-xl p-5">
          <h2 style={{ fontFamily: "'Outfit', sans-serif" }} className="text-[15px] font-700 text-[#111A14] mb-4">
            Mapa de cobertura
          </h2>
          <div className="grid grid-cols-3 gap-1.5 mb-4">
            {coloniasMapa.map((zona) => (
              <div
                key={zona.nombre}
                className="rounded-md p-1.5 text-center text-[9px] font-semibold leading-tight"
                style={{
                  backgroundColor: estadoMapa[zona.estado as keyof typeof estadoMapa] + (zona.estado === 'cubierta' ? '' : '33'),
                  color: zona.estado === 'cubierta' ? '#fff' : zona.estado === 'en progreso' ? '#E8920A' : '#6B7B6E',
                  border: `1px solid ${estadoMapa[zona.estado as keyof typeof estadoMapa]}66`,
                }}
              >
                {zona.nombre}
              </div>
            ))}
          </div>
          <div className="border-t border-[#D4E0D9] pt-3 grid grid-cols-2 gap-1">
            {[
              { color: '#16643A', label: 'Cubierta' },
              { color: '#E8920A', label: 'En progreso' },
              { color: '#D4E0D9', label: 'Pendiente' },
              { color: '#F0F4F1', label: 'No programada' },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-1.5 text-[10px] text-[#5A6B5E]">
                <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ backgroundColor: l.color }} />
                {l.label}
              </div>
            ))}
          </div>
        </div>

        {/* Estado de la flota */}
        <div className="lg:col-span-2 border border-[#D4E0D9] rounded-xl p-5">
          <h2 style={{ fontFamily: "'Outfit', sans-serif" }} className="text-[15px] font-700 text-[#111A14] mb-4">
            Estado de la flota
          </h2>
          <div className="space-y-2 overflow-y-auto max-h-[340px] pr-1">
            {camiones.map((cam) => {
              const cfg = estadoCamion[cam.estado as keyof typeof estadoCamion]
              return (
                <div key={cam.id} className="flex items-center gap-3 border border-[#D4E0D9] rounded-lg p-3 bg-white hover:border-[#B8D9C5] transition-colors">
                  <div className="text-[11px] font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace", color: '#5A6B5E', minWidth: 52 }}>
                    {cam.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-semibold text-[#111A14] truncate">{cam.conductor}</div>
                    <div className="text-[11px] text-[#5A6B5E] truncate">{cam.zona}</div>
                  </div>
                  <div className="w-20 hidden sm:block">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[10px] text-[#5A6B5E]">Avance</span>
                      <span className="text-[10px] font-semibold text-[#111A14]">{cam.progreso}%</span>
                    </div>
                    <div className="h-1.5 bg-[#F0F4F1] rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${cam.progreso}%`, backgroundColor: cfg.color }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {cam.reportes > 0 && (
                      <span className="text-[10px] bg-[#FEF2F2] text-[#DC2626] px-1.5 py-0.5 rounded font-semibold">
                        {cam.reportes} rep.
                      </span>
                    )}
                    <span className="text-[10px] px-2 py-0.5 rounded font-semibold" style={{ backgroundColor: cfg.bg, color: cfg.color }}>
                      {cfg.label}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Reportes ciudadanos */}
      <div className="border border-[#D4E0D9] rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 style={{ fontFamily: "'Outfit', sans-serif" }} className="text-[15px] font-700 text-[#111A14]">
            Reportes ciudadanos
          </h2>
          <div className="flex gap-1.5">
            {(['todos', 'pendiente', 'en atención', 'resuelto'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFiltroReporte(f)}
                className={`text-[11px] px-2.5 py-1 rounded-md font-semibold transition-colors capitalize ${
                  filtroReporte === f
                    ? 'bg-[#16643A] text-white'
                    : 'bg-[#F0F4F1] text-[#5A6B5E] hover:bg-[#E8F2EC]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-[#D4E0D9]">
                {['ID', 'Tipo', 'Zona', 'Hora', 'Urgencia', 'Estado'].map(h => (
                  <th key={h} className="text-left text-[10px] font-semibold tracking-wider text-[#5A6B5E] uppercase py-2 pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reportesFiltrados.map((r) => {
                const cfg = estadoReporte[r.estado as keyof typeof estadoReporte]
                const urgColor = r.urgencia === 'alta' ? '#DC2626' : r.urgencia === 'media' ? '#E8920A' : '#5A6B5E'
                return (
                  <tr key={r.id} className="border-b border-[#F0F4F1] hover:bg-[#F8F9F8]">
                    <td className="py-2.5 pr-4 font-semibold text-[#111A14]" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11 }}>{r.id}</td>
                    <td className="py-2.5 pr-4 text-[#111A14]">{r.tipo}</td>
                    <td className="py-2.5 pr-4 text-[#5A6B5E]">{r.zona}</td>
                    <td className="py-2.5 pr-4 text-[#5A6B5E]" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11 }}>{r.hora}</td>
                    <td className="py-2.5 pr-4">
                      <span className="font-semibold capitalize" style={{ color: urgColor }}>{r.urgencia}</span>
                    </td>
                    <td className="py-2.5">
                      <span className="text-[11px] px-2 py-0.5 rounded font-semibold capitalize" style={{ backgroundColor: cfg.bg, color: cfg.color }}>
                        {r.estado}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Registro de rutas */}
      <div className="border border-[#D4E0D9] rounded-xl p-5">
        <h2 style={{ fontFamily: "'Outfit', sans-serif" }} className="text-[15px] font-700 text-[#111A14] mb-4">
          Registro de rutas completadas
        </h2>
        <div className="space-y-2">
          {rutas.map((ruta, i) => (
            <div key={i} className="flex items-center gap-4 border border-[#D4E0D9] rounded-lg px-4 py-2.5 hover:bg-[#F8F9F8]">
              <span className="text-[11px] text-[#5A6B5E]" style={{ fontFamily: "'JetBrains Mono', monospace", minWidth: 48 }}>{ruta.fecha}</span>
              <span className="text-[11px] text-[#5A6B5E]" style={{ fontFamily: "'JetBrains Mono', monospace", minWidth: 40 }}>{ruta.hora}</span>
              <span className="text-[11px] font-semibold text-[#16643A]" style={{ fontFamily: "'JetBrains Mono', monospace", minWidth: 52 }}>{ruta.camion}</span>
              <span className="text-[12px] text-[#111A14] flex-1">{ruta.zona}</span>
              <span className="text-[11px] text-[#5A6B5E] hidden sm:block">{ruta.distancia}</span>
              <span className="text-[11px] text-[#5A6B5E] hidden md:block">{ruta.duracion}</span>
              <span className="text-[10px] px-2 py-0.5 bg-[#E8F2EC] text-[#16643A] rounded font-semibold">Completada</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
