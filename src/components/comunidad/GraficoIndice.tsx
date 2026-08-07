import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { coloniasCobertura } from '../../data/comunidad'
import { getColorByIndice } from '../../lib/colorScale'

type Orden = 'indice' | 'dias' | 'reportes'

const opciones: { id: Orden; label: string }[] = [
  { id: 'indice', label: 'Índice' },
  { id: 'dias', label: 'Días sin servicio' },
  { id: 'reportes', label: 'Reportes' },
]

export default function GraficoIndice() {
  const [orden, setOrden] = useState<Orden>('indice')

  const datos = [...coloniasCobertura].sort((a, b) => {
    if (orden === 'indice') return a.indice - b.indice
    if (orden === 'dias') return b.dias - a.dias
    return b.reportes - a.reportes
  })

  return (
    <div className="border border-[#D4E0D9] rounded-xl p-5 bg-white">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div>
          <h2 className="font-display text-md font-700 text-[#111A14]">Índice de cobertura por colonia</h2>
          <p className="text-xs text-[#5A6B5E]">Ordenado por índice de menor a mayor</p>
        </div>
        <div className="flex gap-1">
          {opciones.map((o) => (
            <button
              key={o.id}
              onClick={() => setOrden(o.id)}
              className={`text-xs px-2 py-1 rounded font-semibold transition-colors ${
                orden === o.id ? 'bg-[#16643A] text-white' : 'bg-[#F0F4F1] text-[#5A6B5E] hover:bg-[#E8F2EC]'
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={datos} layout="vertical" margin={{ left: 8, right: 16, top: 0, bottom: 0 }}>
          <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: '#5A6B5E' }} />
          <YAxis
            type="category"
            dataKey="nombre"
            width={140}
            tick={{ fontSize: 10, fill: '#5A6B5E' }}
            tickFormatter={(v: string) => v.replace('Barrio ', 'B. ').replace('Col. ', '')}
          />
          <Tooltip formatter={(val) => [`${val}`, 'Índice']} contentStyle={{ fontSize: 11, borderColor: '#D4E0D9', borderRadius: 6 }} />
          <Bar dataKey="indice" radius={[0, 3, 3, 0]}>
            {datos.map((entry) => (
              <Cell key={entry.nombre} fill={getColorByIndice(entry.indice)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
