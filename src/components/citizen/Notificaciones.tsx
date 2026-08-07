import { useState } from 'react'
import { notificaciones } from '../../data/ciudadana'

const colorPorTipo = {
  info: { bg: '#EFF6FF', border: '#BFDBFE', dot: '#2563EB' },
  success: { bg: '#E8F2EC', border: '#B8D9C5', dot: '#16643A' },
  warning: { bg: '#FEF3E2', border: '#FCD69B', dot: '#E8920A' },
} as const

export default function Notificaciones() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className="border border-[#D4E0D9] rounded-xl p-5 bg-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-md font-700 text-[#111A14]">Notificaciones</h2>
        <button onClick={() => setVisible(false)} className="text-sm text-[#5A6B5E] hover:text-[#111A14]">
          Cerrar
        </button>
      </div>

      <div className="space-y-2">
        {notificaciones.map((n) => {
          const colors = colorPorTipo[n.tipo as keyof typeof colorPorTipo]
          return (
            <div
              key={n.id}
              className="flex items-start gap-3 rounded-lg p-3 border"
              style={{ backgroundColor: colors.bg, borderColor: colors.border }}
            >
              <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: colors.dot }} />
              <div className="flex-1 text-sm text-[#111A14]">{n.msg}</div>
              <div className="text-xs text-[#5A6B5E] flex-shrink-0">{n.tiempo}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
