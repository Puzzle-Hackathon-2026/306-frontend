import { coloniasMapaOperativo, type EstadoMapa } from '../../data/operativo'

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

export default function MapaCobertura() {
  return (
    <div className="border border-[#D4E0D9] rounded-xl p-5 bg-white">
      <h2 className="font-display text-[15px] font-700 text-[#111A14] mb-4">Mapa de cobertura</h2>

      <div className="grid grid-cols-3 gap-1.5 mb-4">
        {coloniasMapaOperativo.map((zona) => (
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
