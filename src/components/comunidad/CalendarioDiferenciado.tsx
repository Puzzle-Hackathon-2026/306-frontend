import { calendarioDiferenciado } from '../../data/comunidad'

export default function CalendarioDiferenciado() {
  return (
    <div className="border border-[#D4E0D9] rounded-xl p-5 bg-white">
      <h2 className="font-display text-md font-700 text-[#111A14] mb-1">Calendario diferenciado</h2>
      <p className="text-xs text-[#5A6B5E] mb-3">Días de recolección por tipo de residuo</p>

      <div className="grid grid-cols-6 gap-1.5">
        {calendarioDiferenciado.map((d) => (
          <div key={d.dia} className="text-center">
            <div className="text-xs font-semibold text-[#5A6B5E] mb-1.5">{d.dia}</div>
            <div className={`rounded-md p-1.5 mb-1 border text-2xs font-bold ${d.general ? 'bg-[#111A14] text-white border-[#111A14]' : 'bg-[#F0F4F1] text-[#B0BDB5] border-[#E8EDE9]'}`}>
              🗑️
            </div>
            <div className={`rounded-md p-1.5 mb-1 border text-2xs font-bold ${d.reciclaje ? 'bg-[#2563EB] text-white border-[#2563EB]' : 'bg-[#F0F4F1] text-[#B0BDB5] border-[#E8EDE9]'}`}>
              ♻️
            </div>
            <div className={`rounded-md p-1.5 border text-2xs font-bold ${d.organico ? 'bg-[#16643A] text-white border-[#16643A]' : 'bg-[#F0F4F1] text-[#B0BDB5] border-[#E8EDE9]'}`}>
              🌱
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex gap-3 text-xs text-[#5A6B5E]">
        <span className="flex items-center gap-1"><span className="w-2 h-2 bg-[#111A14] rounded-sm" />General</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 bg-[#2563EB] rounded-sm" />Reciclaje</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 bg-[#16643A] rounded-sm" />Orgánico</span>
      </div>
    </div>
  )
}
