import { useState } from 'react'
import { guiaSeparacion } from '../../data/comunidad'

export default function GuiaSeparacion() {
  const [seleccionado, setSeleccionado] = useState<string | null>(null)
  const item = guiaSeparacion.find((g) => g.tipo === seleccionado)

  return (
    <div className="border border-[#D4E0D9] rounded-xl p-5 bg-white">
      <h2 className="font-display text-[15px] font-700 text-[#111A14] mb-1">Guía de separación de residuos</h2>
      <p className="text-[11px] text-[#5A6B5E] mb-4">Selecciona un tipo para ver ejemplos detallados</p>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
        {guiaSeparacion.map((g) => (
          <button
            key={g.tipo}
            onClick={() => setSeleccionado(seleccionado === g.tipo ? null : g.tipo)}
            className="rounded-xl p-3 text-center border-2 transition-all"
            style={{
              backgroundColor: seleccionado === g.tipo ? g.bg : '#FAFAFA',
              borderColor: seleccionado === g.tipo ? g.color : '#D4E0D9',
            }}
          >
            <div className="text-3xl mb-1.5">{g.icono}</div>
            <div className="text-[12px] font-semibold" style={{ color: g.color }}>{g.tipo}</div>
            <div className="text-[10px] text-[#5A6B5E] mt-0.5">Contenedor {g.contenedor}</div>
          </button>
        ))}
      </div>

      {item && (
        <div className="rounded-xl border p-4 flex gap-4" style={{ backgroundColor: item.bg, borderColor: item.color + '44' }}>
          <div className="text-4xl flex-shrink-0">{item.icono}</div>
          <div className="flex-1">
            <div className="text-[13px] font-semibold mb-2" style={{ color: item.color }}>
              {item.tipo} · Contenedor {item.contenedor}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 mb-2">
              {item.ejemplos.map((e) => (
                <div key={e} className="text-[11px] text-[#111A14] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  {e}
                </div>
              ))}
            </div>
            <div className="text-[11px] text-[#5A6B5E] italic">{item.nota}</div>
          </div>
        </div>
      )}
    </div>
  )
}
