import { useState } from 'react'
import { tiposProblema } from '../../data/ciudadana'

interface Props {
  colonia: string
}

export default function ReportarProblema({ colonia }: Props) {
  const [tipoReporte, setTipoReporte] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [enviado, setEnviado] = useState(false)

  const enviarReporte = () => {
    if (!tipoReporte) return
    setEnviado(true)
    setTimeout(() => setEnviado(false), 3500)
    setTipoReporte('')
    setDescripcion('')
  }

  if (enviado) {
    return (
      <div className="border border-[#B8D9C5] bg-[#F4FBF6] rounded-xl p-5 flex flex-col items-center justify-center py-10 gap-3 text-center">
        <div className="w-12 h-12 bg-[#16643A] rounded-full flex items-center justify-center text-white text-xl">✓</div>
        <div className="font-display text-md font-700 text-[#16643A]">Reporte enviado</div>
        <div className="text-sm text-[#5A6B5E]">
          Número de seguimiento: <span className="font-mono font-semibold">#0047</span>
        </div>
        <div className="text-sm text-[#5A6B5E]">Te notificaremos cuando sea atendido.</div>
      </div>
    )
  }

  return (
    <div className="border border-[#D4E0D9] rounded-xl p-5 bg-white">
      <h2 className="font-display text-md font-700 text-[#111A14] mb-4">Reportar un problema</h2>

      <div className="space-y-3">
        <div>
          <label className="block text-xs font-semibold tracking-wider text-[#5A6B5E] uppercase mb-1.5">
            Tipo de problema
          </label>
          <select
            value={tipoReporte}
            onChange={(e) => setTipoReporte(e.target.value)}
            className="w-full border border-[#D4E0D9] rounded-md px-3 py-2 text-sm text-[#111A14] bg-white focus:outline-none focus:ring-2 focus:ring-[#16643A]"
          >
            <option value="">Seleccionar tipo...</option>
            {tiposProblema.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold tracking-wider text-[#5A6B5E] uppercase mb-1.5">
            Ubicación
          </label>
          <input
            readOnly
            value={`${colonia}, San Pedro Sula`}
            className="w-full border border-[#D4E0D9] rounded-md px-3 py-2 text-sm text-[#5A6B5E] bg-[#F8F9F8]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold tracking-wider text-[#5A6B5E] uppercase mb-1.5">
            Descripción (opcional)
          </label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Describe el problema con detalle..."
            rows={3}
            className="w-full border border-[#D4E0D9] rounded-md px-3 py-2 text-sm text-[#111A14] bg-white focus:outline-none focus:ring-2 focus:ring-[#16643A] resize-none"
          />
        </div>

        <button
          onClick={enviarReporte}
          disabled={!tipoReporte}
          className="w-full bg-[#16643A] text-white py-2.5 rounded-md text-sm font-semibold disabled:opacity-40 hover:bg-[#1A7A46] transition-colors"
        >
          Enviar reporte
        </button>
      </div>
    </div>
  )
}
