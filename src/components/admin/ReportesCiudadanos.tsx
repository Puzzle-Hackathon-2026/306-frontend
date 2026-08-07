import { useState } from 'react'
import { reportesOperativos, type EstadoReporte } from '../../data/operativo'

const cfgEstado: Record<EstadoReporte, { color: string; bg: string }> = {
  pendiente: { color: '#2563EB', bg: '#EFF6FF' },
  'en atención': { color: '#E8920A', bg: '#FEF3E2' },
  resuelto: { color: '#16643A', bg: '#E8F2EC' },
}

const filtros: ('todos' | EstadoReporte)[] = ['todos', 'pendiente', 'en atención', 'resuelto']

export default function ReportesCiudadanos() {
  const [filtro, setFiltro] = useState<'todos' | EstadoReporte>('todos')

  const filtrados = filtro === 'todos' ? reportesOperativos : reportesOperativos.filter((r) => r.estado === filtro)

  return (
    <div className="border border-[#D4E0D9] rounded-xl p-5 bg-white">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h2 className="font-display text-[15px] font-700 text-[#111A14]">Reportes ciudadanos</h2>
        <div className="flex gap-1.5">
          {filtros.map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`text-[11px] px-2.5 py-1 rounded-md font-semibold transition-colors capitalize ${
                filtro === f ? 'bg-[#16643A] text-white' : 'bg-[#F0F4F1] text-[#5A6B5E] hover:bg-[#E8F2EC]'
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
              {['ID', 'Tipo', 'Zona', 'Hora', 'Urgencia', 'Estado'].map((h) => (
                <th key={h} className="text-left text-[10px] font-semibold tracking-wider text-[#5A6B5E] uppercase py-2 pr-4">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtrados.map((r) => {
              const cfg = cfgEstado[r.estado]
              const urgColor = r.urgencia === 'alta' ? '#DC2626' : r.urgencia === 'media' ? '#E8920A' : '#5A6B5E'
              return (
                <tr key={r.id} className="border-b border-[#F0F4F1] hover:bg-[#F8F9F8]">
                  <td className="py-2.5 pr-4 font-semibold text-[#111A14] font-mono" style={{ fontSize: 11 }}>{r.id}</td>
                  <td className="py-2.5 pr-4 text-[#111A14]">{r.tipo}</td>
                  <td className="py-2.5 pr-4 text-[#5A6B5E]">{r.zona}</td>
                  <td className="py-2.5 pr-4 text-[#5A6B5E] font-mono" style={{ fontSize: 11 }}>{r.hora}</td>
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
  )
}
