import { useState } from 'react'

const guiaSeparacion = [
  {
    tipo: 'Orgánico',
    color: '#16643A',
    bg: '#E8F2EC',
    icono: '🥦',
    ejemplos: ['Restos de comida', 'Cáscaras de fruta', 'Posos de café', 'Hojas y pasto', 'Restos de jardín'],
    contenedor: 'Verde',
    nota: 'Se convierte en compost. No incluir carnes ni aceites.',
  },
  {
    tipo: 'Plástico',
    color: '#2563EB',
    bg: '#EFF6FF',
    icono: '♻️',
    ejemplos: ['Botellas PET', 'Envases de yogurt', 'Bolsas plásticas', 'Tapas y tapones', 'Empaques de alimentos'],
    contenedor: 'Azul',
    nota: 'Enjuagar antes de depositar. Aplastar para reducir volumen.',
  },
  {
    tipo: 'Vidrio',
    color: '#7C3AED',
    bg: '#F5F3FF',
    icono: '🫙',
    ejemplos: ['Botellas de vidrio', 'Frascos de mermelada', 'Envases de salsas', 'Botellas de bebidas'],
    contenedor: 'Morado',
    nota: 'No incluir espejos ni vidrio de ventanas. Manejo con cuidado.',
  },
  {
    tipo: 'Cartón y papel',
    color: '#92400E',
    bg: '#FEF3C7',
    icono: '📦',
    ejemplos: ['Cajas de cartón', 'Periódicos', 'Revistas', 'Papel de oficina', 'Cajas de cereal'],
    contenedor: 'Amarillo',
    nota: 'Mantener seco y libre de grasas. Doblar cajas para ahorrar espacio.',
  },
  {
    tipo: 'Peligroso',
    color: '#DC2626',
    bg: '#FEF2F2',
    icono: '⚠️',
    ejemplos: ['Pilas y baterías', 'Medicamentos vencidos', 'Aceite de cocina', 'Pinturas', 'Insecticidas'],
    contenedor: 'Rojo',
    nota: 'NUNCA mezclar con basura común. Llevar a punto de acopio especial.',
  },
]

const puntosAcopio = [
  { nombre: 'Centro de Reciclaje San Pedro', zona: 'Barrio El Centro', materiales: ['Plástico', 'Vidrio', 'Cartón'], horario: 'L-V 7:00–17:00', distancia: '1.2 km', activo: true },
  { nombre: 'EcoPoint Guamilito', zona: 'Barrio Guamilito', materiales: ['Plástico', 'Vidrio'], horario: 'L-S 8:00–16:00', distancia: '2.4 km', activo: true },
  { nombre: 'Punto Verde Las Palmas', zona: 'Col. Las Palmas', materiales: ['Orgánico', 'Cartón'], horario: 'L-V 6:30–15:00', distancia: '3.1 km', activo: true },
  { nombre: 'Acopio Reciclado Miraflores', zona: 'Col. Miraflores', materiales: ['Plástico', 'Vidrio', 'Peligroso'], horario: 'Mar-Jue 9:00–14:00', distancia: '4.7 km', activo: false },
  { nombre: 'Centro Ambiental Los Andes', zona: 'Col. Los Andes', materiales: ['Plástico', 'Cartón', 'Vidrio', 'Peligroso'], horario: 'L-V 7:00–18:00', distancia: '5.8 km', activo: true },
]

const calendarioDiferenciado = [
  { dia: 'Lun', general: true, reciclaje: false, organico: false },
  { dia: 'Mar', general: false, reciclaje: true, organico: false },
  { dia: 'Mié', general: true, reciclaje: false, organico: true },
  { dia: 'Jue', general: false, reciclaje: true, organico: false },
  { dia: 'Vie', general: true, reciclaje: false, organico: true },
  { dia: 'Sáb', general: false, reciclaje: true, organico: false },
]

const logros = [
  { id: 1, titulo: 'Primer reporte', descripcion: 'Enviaste tu primer reporte ciudadano', puntos: 10, desbloqueado: true, icono: '📣' },
  { id: 2, titulo: 'Vecino activo', descripcion: '5 reportes enviados este mes', puntos: 30, desbloqueado: true, icono: '🏘️' },
  { id: 3, titulo: 'Reciclador novato', descripcion: 'Visitaste un punto de acopio', puntos: 20, desbloqueado: true, icono: '♻️' },
  { id: 4, titulo: 'Guardián verde', descripcion: '10 reportes de punto ilegal resueltos', puntos: 80, desbloqueado: false, icono: '🌿' },
  { id: 5, titulo: 'Líder de colonia', descripcion: 'Top 3 en reportes de tu zona', puntos: 150, desbloqueado: false, icono: '🏆' },
  { id: 6, titulo: 'Campeón ambiental', descripcion: '50 visitas a puntos de acopio', puntos: 300, desbloqueado: false, icono: '🌍' },
]

const puntosUsuario = 60

export default function ModuloC() {
  const [tipoSeleccionado, setTipoSeleccionado] = useState<string | null>(null)
  const [soloPuntosActivos, setSoloPuntosActivos] = useState(false)

  const puntosFiltrados = soloPuntosActivos
    ? puntosAcopio.filter(p => p.activo)
    : puntosAcopio

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-[11px] font-semibold tracking-widest text-[#5A6B5E] uppercase mb-1">
          Módulo C · Ambiental
        </p>
        <h1 style={{ fontFamily: "'Outfit', sans-serif" }} className="text-3xl font-800 text-[#111A14] leading-none">
          Reciclaje y segregación
        </h1>
        <p className="text-[13px] text-[#5A6B5E] mt-1">
          Guía de separación, puntos de acopio y sistema de incentivos ciudadanos
        </p>
      </div>

      {/* Sistema de incentivos — banner */}
      <div className="rounded-xl border border-[#B8D9C5] bg-gradient-to-r from-[#E8F2EC] to-[#F0F7F2] p-5 flex items-center gap-5">
        <div>
          <div className="text-[11px] font-semibold tracking-widest text-[#5A6B5E] uppercase mb-0.5">Tu cuenta · EcoVecino</div>
          <div style={{ fontFamily: "'Outfit', sans-serif" }} className="text-3xl font-800 text-[#16643A]">
            {puntosUsuario} pts
          </div>
          <div className="text-[12px] text-[#5A6B5E] mt-1">3 logros desbloqueados · Nivel: Reciclador Novato</div>
        </div>
        <div className="flex-1">
          <div className="flex justify-between text-[11px] text-[#5A6B5E] mb-1.5">
            <span>Próximo logro: Guardián Verde</span>
            <span>{puntosUsuario}/80 pts</span>
          </div>
          <div className="h-3 bg-white rounded-full overflow-hidden border border-[#B8D9C5]">
            <div
              className="h-full bg-[#16643A] rounded-full transition-all"
              style={{ width: `${(puntosUsuario / 80) * 100}%` }}
            />
          </div>
          <div className="text-[10px] text-[#5A6B5E] mt-1">20 puntos más para desbloquear el siguiente logro</div>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          {logros.filter(l => l.desbloqueado).map(l => (
            <div key={l.id} title={l.titulo} className="w-9 h-9 rounded-lg bg-white border border-[#B8D9C5] flex items-center justify-center text-xl shadow-sm">
              {l.icono}
            </div>
          ))}
        </div>
      </div>

      {/* Guía de separación */}
      <div className="border border-[#D4E0D9] rounded-xl p-5">
        <h2 style={{ fontFamily: "'Outfit', sans-serif" }} className="text-[15px] font-700 text-[#111A14] mb-1">
          Guía de separación de residuos
        </h2>
        <p className="text-[11px] text-[#5A6B5E] mb-4">Selecciona un tipo para ver ejemplos detallados</p>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
          {guiaSeparacion.map((item) => (
            <button
              key={item.tipo}
              onClick={() => setTipoSeleccionado(tipoSeleccionado === item.tipo ? null : item.tipo)}
              className="rounded-xl p-3 text-center border-2 transition-all"
              style={{
                backgroundColor: tipoSeleccionado === item.tipo ? item.bg : '#FAFAFA',
                borderColor: tipoSeleccionado === item.tipo ? item.color : '#D4E0D9',
              }}
            >
              <div className="text-3xl mb-1.5">{item.icono}</div>
              <div className="text-[12px] font-semibold" style={{ color: item.color }}>{item.tipo}</div>
              <div className="text-[10px] text-[#5A6B5E] mt-0.5">Contenedor {item.contenedor}</div>
            </button>
          ))}
        </div>

        {tipoSeleccionado && (() => {
          const sel = guiaSeparacion.find(g => g.tipo === tipoSeleccionado)!
          return (
            <div className="rounded-xl border p-4 flex gap-4" style={{ backgroundColor: sel.bg, borderColor: sel.color + '44' }}>
              <div className="text-4xl flex-shrink-0">{sel.icono}</div>
              <div className="flex-1">
                <div className="text-[13px] font-semibold mb-2" style={{ color: sel.color }}>
                  {sel.tipo} · Contenedor {sel.contenedor}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 mb-2">
                  {sel.ejemplos.map((e) => (
                    <div key={e} className="text-[11px] text-[#111A14] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: sel.color }} />
                      {e}
                    </div>
                  ))}
                </div>
                <div className="text-[11px] text-[#5A6B5E] italic">{sel.nota}</div>
              </div>
            </div>
          )
        })()}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mapa de puntos de acopio */}
        <div className="border border-[#D4E0D9] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 style={{ fontFamily: "'Outfit', sans-serif" }} className="text-[15px] font-700 text-[#111A14]">
                Puntos de acopio
              </h2>
              <p className="text-[11px] text-[#5A6B5E]">Centros de reciclaje cercanos</p>
            </div>
            <button
              onClick={() => setSoloPuntosActivos(!soloPuntosActivos)}
              className={`text-[11px] px-2.5 py-1.5 rounded-md font-semibold transition-colors ${
                soloPuntosActivos ? 'bg-[#16643A] text-white' : 'bg-[#F0F4F1] text-[#5A6B5E] hover:bg-[#E8F2EC]'
              }`}
            >
              Solo abiertos
            </button>
          </div>
          <div className="space-y-2.5">
            {puntosFiltrados.map((p) => (
              <div
                key={p.nombre}
                className={`rounded-lg border p-3 transition-colors ${p.activo ? 'border-[#B8D9C5] bg-white hover:bg-[#F8FBF9]' : 'border-[#D4E0D9] bg-[#F8F9F8] opacity-60'}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${p.activo ? 'bg-[#16643A]' : 'bg-[#6B7B6E]'}`} />
                      <span className="text-[12px] font-semibold text-[#111A14] truncate">{p.nombre}</span>
                    </div>
                    <div className="text-[10px] text-[#5A6B5E] mt-0.5 ml-4">{p.zona} · {p.horario}</div>
                  </div>
                  <span className="text-[10px] text-[#5A6B5E] flex-shrink-0" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {p.distancia}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2 ml-4">
                  {p.materiales.map((m) => {
                    const item = guiaSeparacion.find(g => g.tipo === m)
                    return (
                      <span
                        key={m}
                        className="text-[9px] font-semibold px-1.5 py-0.5 rounded"
                        style={{ backgroundColor: item?.bg ?? '#F0F4F1', color: item?.color ?? '#5A6B5E' }}
                      >
                        {m}
                      </span>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calendario diferenciado + Logros */}
        <div className="space-y-4">
          {/* Calendario diferenciado */}
          <div className="border border-[#D4E0D9] rounded-xl p-5">
            <h2 style={{ fontFamily: "'Outfit', sans-serif" }} className="text-[15px] font-700 text-[#111A14] mb-1">
              Calendario diferenciado
            </h2>
            <p className="text-[11px] text-[#5A6B5E] mb-3">Días de recolección por tipo de residuo</p>
            <div className="grid grid-cols-6 gap-1.5">
              {calendarioDiferenciado.map((d) => (
                <div key={d.dia} className="text-center">
                  <div className="text-[10px] font-semibold text-[#5A6B5E] mb-1.5">{d.dia}</div>
                  <div className={`rounded-md p-1.5 mb-1 border text-[9px] font-bold ${d.general ? 'bg-[#111A14] text-white border-[#111A14]' : 'bg-[#F0F4F1] text-[#B0BDB5] border-[#E8EDE9]'}`}>
                    🗑️
                  </div>
                  <div className={`rounded-md p-1.5 mb-1 border text-[9px] font-bold ${d.reciclaje ? 'bg-[#2563EB] text-white border-[#2563EB]' : 'bg-[#F0F4F1] text-[#B0BDB5] border-[#E8EDE9]'}`}>
                    ♻️
                  </div>
                  <div className={`rounded-md p-1.5 border text-[9px] font-bold ${d.organico ? 'bg-[#16643A] text-white border-[#16643A]' : 'bg-[#F0F4F1] text-[#B0BDB5] border-[#E8EDE9]'}`}>
                    🌱
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex gap-3 text-[10px] text-[#5A6B5E]">
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-[#111A14] rounded-sm" />General</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-[#2563EB] rounded-sm" />Reciclaje</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-[#16643A] rounded-sm" />Orgánico</span>
            </div>
          </div>

          {/* Logros */}
          <div className="border border-[#D4E0D9] rounded-xl p-5">
            <h2 style={{ fontFamily: "'Outfit', sans-serif" }} className="text-[15px] font-700 text-[#111A14] mb-1">
              Sistema de logros
            </h2>
            <p className="text-[11px] text-[#5A6B5E] mb-3">Participa, acumula puntos y gana reconocimientos</p>
            <div className="grid grid-cols-2 gap-2">
              {logros.map((l) => (
                <div
                  key={l.id}
                  className={`rounded-lg border p-2.5 flex items-center gap-2.5 transition-all ${
                    l.desbloqueado
                      ? 'border-[#B8D9C5] bg-[#F4FBF6]'
                      : 'border-[#E8EDE9] bg-[#F8F9F8] opacity-50 grayscale'
                  }`}
                >
                  <div className="text-2xl flex-shrink-0">{l.icono}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-semibold text-[#111A14] truncate">{l.titulo}</div>
                    <div className="text-[9px] text-[#5A6B5E] leading-tight">{l.descripcion}</div>
                    <div className="text-[9px] font-semibold text-[#16643A] mt-0.5">+{l.puntos} pts</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
