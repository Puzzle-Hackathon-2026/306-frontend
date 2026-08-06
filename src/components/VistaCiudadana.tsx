import { useState } from 'react'

const colonias = [
  'Col. Trejo', 'Col. Las Palmas', 'Col. Los Andes', 'Barrio El Centro',
  'Barrio Cabañas', 'Col. Miraflores', 'Col. El Prado', 'Col. Villa del Sol',
  'Barrio Guamilito', 'Col. Moderna', 'Col. Universitaria', 'Col. La Hacienda',
  'Barrio Suyapa', 'Col. Alameda', 'Col. Jardines del Valle',
]

const horarios: Record<string, { dias: string[]; hora: string; estado: 'pasó' | 'en camino' | 'pendiente' | 'no pasa hoy' }> = {
  'Col. Trejo': { dias: ['Lunes', 'Miércoles', 'Viernes'], hora: '07:30', estado: 'pasó' },
  'Col. Las Palmas': { dias: ['Martes', 'Jueves'], hora: '08:00', estado: 'en camino' },
  'Col. Los Andes': { dias: ['Lunes', 'Miércoles', 'Viernes'], hora: '09:15', estado: 'pendiente' },
  'Barrio El Centro': { dias: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'], hora: '06:30', estado: 'pasó' },
  'Barrio Cabañas': { dias: ['Martes', 'Jueves', 'Sábado'], hora: '10:00', estado: 'en camino' },
  'Col. Miraflores': { dias: ['Lunes', 'Miércoles'], hora: '11:00', estado: 'no pasa hoy' },
  'Col. El Prado': { dias: ['Martes', 'Viernes'], hora: '08:45', estado: 'no pasa hoy' },
  'Col. Villa del Sol': { dias: ['Lunes', 'Miércoles', 'Viernes'], hora: '07:00', estado: 'pasó' },
  'Barrio Guamilito': { dias: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'], hora: '06:00', estado: 'pasó' },
  'Col. Moderna': { dias: ['Martes', 'Jueves'], hora: '09:30', estado: 'pendiente' },
  'Col. Universitaria': { dias: ['Lunes', 'Miércoles', 'Viernes'], hora: '10:30', estado: 'pendiente' },
  'Col. La Hacienda': { dias: ['Martes', 'Viernes'], hora: '11:15', estado: 'no pasa hoy' },
  'Barrio Suyapa': { dias: ['Lunes', 'Jueves'], hora: '08:30', estado: 'en camino' },
  'Col. Alameda': { dias: ['Miércoles', 'Sábado'], hora: '09:00', estado: 'no pasa hoy' },
  'Col. Jardines del Valle': { dias: ['Martes', 'Jueves'], hora: '07:45', estado: 'pendiente' },
}

const diasSemana = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

const notificaciones = [
  { id: 1, tipo: 'info', msg: 'El camión de Col. Las Palmas está a 3 paradas de tu zona.', tiempo: 'hace 8 min' },
  { id: 2, tipo: 'success', msg: 'Tu reporte #0041 fue atendido y cerrado exitosamente.', tiempo: 'hace 2 h' },
  { id: 3, tipo: 'warning', msg: 'Ruta de Col. Miraflores cancelada hoy por mantenimiento.', tiempo: 'hace 3 h' },
]

const tiposProblema = [
  'Basura acumulada',
  'Camión no pasó en fecha programada',
  'Punto ilegal de disposición',
  'Desbordamiento de contenedor',
  'Otro',
]

const estadoConfig = {
  'pasó': { color: '#16643A', bg: '#E8F2EC', label: 'Ya pasó hoy', icon: '✓' },
  'en camino': { color: '#E8920A', bg: '#FEF3E2', label: 'En camino a tu zona', icon: '→' },
  'pendiente': { color: '#2563EB', bg: '#EFF6FF', label: 'Pasa más tarde hoy', icon: '◷' },
  'no pasa hoy': { color: '#6B7B6E', bg: '#F0F4F1', label: 'No pasa hoy', icon: '—' },
}

export default function VistaCiudadana() {
  const [colonia, setColonia] = useState('Col. Las Palmas')
  const [tipoReporte, setTipoReporte] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [reporteEnviado, setReporteEnviado] = useState(false)
  const [mostrarNotif, setMostrarNotif] = useState(true)

  const info = horarios[colonia]
  const estado = estadoConfig[info.estado]

  const enviarReporte = () => {
    if (!tipoReporte) return
    setReporteEnviado(true)
    setTimeout(() => setReporteEnviado(false), 3500)
    setTipoReporte('')
    setDescripcion('')
  }

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold tracking-widest text-[#5A6B5E] uppercase mb-1">Vista 01 · Ciudadano</p>
          <h1 style={{ fontFamily: "'Outfit', sans-serif" }} className="text-3xl font-800 text-[#111A14] leading-none">
            Tu colonia,<br />tu recolección.
          </h1>
        </div>
        {/* Colonia selector */}
        <div className="flex-shrink-0">
          <label className="block text-[11px] font-semibold tracking-wider text-[#5A6B5E] uppercase mb-1.5">
            Mi colonia
          </label>
          <select
            value={colonia}
            onChange={(e) => setColonia(e.target.value)}
            className="border border-[#D4E0D9] rounded-md px-3 py-2 text-[13px] text-[#111A14] bg-white focus:outline-none focus:ring-2 focus:ring-[#16643A] min-w-[200px]"
          >
            {colonias.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Estado en tiempo real */}
      <div
        className="rounded-xl p-6 flex items-center gap-6 border"
        style={{ backgroundColor: estado.bg, borderColor: estado.color + '33' }}
      >
        <div
          className="w-14 h-14 rounded-lg flex items-center justify-center text-2xl font-bold flex-shrink-0"
          style={{ backgroundColor: estado.color, color: '#fff' }}
        >
          {estado.icon}
        </div>
        <div className="flex-1">
          <div className="text-[11px] font-semibold tracking-widest uppercase mb-1" style={{ color: estado.color }}>
            Estado en tiempo real · {colonia}
          </div>
          <div style={{ fontFamily: "'Outfit', sans-serif" }} className="text-2xl font-700 text-[#111A14]">
            {estado.label}
          </div>
          <div className="text-[13px] text-[#5A6B5E] mt-1">
            Horario programado: <span className="font-semibold text-[#111A14]">{info.hora} hrs</span>
          </div>
        </div>
        {info.estado === 'en camino' && (
          <div className="flex flex-col items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-[#E8920A] animate-ping" />
            <span className="text-[11px] text-[#E8920A] font-semibold">VIVO</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendario semanal */}
        <div className="border border-[#D4E0D9] rounded-xl p-5">
          <h2 style={{ fontFamily: "'Outfit', sans-serif" }} className="text-[15px] font-700 text-[#111A14] mb-4">
            Calendario de recolección
          </h2>
          <div className="grid grid-cols-6 gap-2 mb-4">
            {diasSemana.map((dia) => {
              const nombre = { Lun: 'Lunes', Mar: 'Martes', Mié: 'Miércoles', Jue: 'Jueves', Vie: 'Viernes', Sáb: 'Sábado' }[dia]!
              const activo = info.dias.includes(nombre)
              const esHoy = dia === 'Mar'
              return (
                <div
                  key={dia}
                  className={`rounded-lg p-2 text-center border ${
                    activo
                      ? esHoy
                        ? 'bg-[#16643A] border-[#16643A] text-white'
                        : 'bg-[#E8F2EC] border-[#B8D9C5] text-[#16643A]'
                      : 'bg-[#F8F9F8] border-[#E8EDE9] text-[#B0BDB5]'
                  }`}
                >
                  <div className="text-[10px] font-semibold tracking-wide">{dia}</div>
                  <div className="text-[18px] mt-1">{activo ? '🗑️' : '·'}</div>
                  {esHoy && <div className="text-[9px] mt-0.5 font-bold">HOY</div>}
                </div>
              )
            })}
          </div>
          <div className="border-t border-[#D4E0D9] pt-3 text-[12px] text-[#5A6B5E]">
            <span className="font-semibold text-[#111A14]">Días de recolección:</span>{' '}
            {info.dias.join(', ')} · <span className="font-semibold">{info.hora} hrs</span>
          </div>
          <div className="mt-2 flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-[#16643A] rounded-sm inline-block" />Recolección</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-[#E8F2EC] border border-[#B8D9C5] rounded-sm inline-block" />Otros días</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-[#F8F9F8] border border-[#E8EDE9] rounded-sm inline-block" />No pasa</span>
          </div>
        </div>

        {/* Reportar problema */}
        <div className="border border-[#D4E0D9] rounded-xl p-5">
          <h2 style={{ fontFamily: "'Outfit', sans-serif" }} className="text-[15px] font-700 text-[#111A14] mb-4">
            Reportar un problema
          </h2>

          {reporteEnviado ? (
            <div className="flex flex-col items-center justify-center py-8 gap-3 text-center">
              <div className="w-12 h-12 bg-[#16643A] rounded-full flex items-center justify-center text-white text-xl">✓</div>
              <div style={{ fontFamily: "'Outfit', sans-serif" }} className="text-[16px] font-700 text-[#16643A]">Reporte enviado</div>
              <div className="text-[13px] text-[#5A6B5E]">Número de seguimiento: <span className="font-mono font-semibold">#0047</span></div>
              <div className="text-[12px] text-[#5A6B5E]">Te notificaremos cuando sea atendido.</div>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold tracking-wider text-[#5A6B5E] uppercase mb-1.5">
                  Tipo de problema
                </label>
                <select
                  value={tipoReporte}
                  onChange={(e) => setTipoReporte(e.target.value)}
                  className="w-full border border-[#D4E0D9] rounded-md px-3 py-2 text-[13px] text-[#111A14] bg-white focus:outline-none focus:ring-2 focus:ring-[#16643A]"
                >
                  <option value="">Seleccionar tipo...</option>
                  {tiposProblema.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold tracking-wider text-[#5A6B5E] uppercase mb-1.5">
                  Ubicación
                </label>
                <input
                  readOnly
                  value={`${colonia}, San Pedro Sula`}
                  className="w-full border border-[#D4E0D9] rounded-md px-3 py-2 text-[13px] text-[#5A6B5E] bg-[#F8F9F8]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold tracking-wider text-[#5A6B5E] uppercase mb-1.5">
                  Descripción (opcional)
                </label>
                <textarea
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Describe el problema con detalle..."
                  rows={3}
                  className="w-full border border-[#D4E0D9] rounded-md px-3 py-2 text-[13px] text-[#111A14] bg-white focus:outline-none focus:ring-2 focus:ring-[#16643A] resize-none"
                />
              </div>
              <button
                onClick={enviarReporte}
                disabled={!tipoReporte}
                className="w-full bg-[#16643A] text-white py-2.5 rounded-md text-[13px] font-semibold disabled:opacity-40 hover:bg-[#1A7A46] transition-colors"
              >
                Enviar reporte
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Notificaciones */}
      {mostrarNotif && (
        <div className="border border-[#D4E0D9] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 style={{ fontFamily: "'Outfit', sans-serif" }} className="text-[15px] font-700 text-[#111A14]">
              Notificaciones
            </h2>
            <button onClick={() => setMostrarNotif(false)} className="text-[12px] text-[#5A6B5E] hover:text-[#111A14]">
              Cerrar
            </button>
          </div>
          <div className="space-y-2">
            {notificaciones.map((n) => {
              const colors = {
                info: { bg: '#EFF6FF', border: '#BFDBFE', dot: '#2563EB' },
                success: { bg: '#E8F2EC', border: '#B8D9C5', dot: '#16643A' },
                warning: { bg: '#FEF3E2', border: '#FCD69B', dot: '#E8920A' },
              }[n.tipo]!
              return (
                <div key={n.id} className="flex items-start gap-3 rounded-lg p-3 border" style={{ backgroundColor: colors.bg, borderColor: colors.border }}>
                  <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: colors.dot }} />
                  <div className="flex-1 text-[13px] text-[#111A14]">{n.msg}</div>
                  <div className="text-[11px] text-[#5A6B5E] flex-shrink-0">{n.tiempo}</div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
