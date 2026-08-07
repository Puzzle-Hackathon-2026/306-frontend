import { logros } from '../../data/comunidad'

export default function Logros() {
  return (
    <div className="border border-[#D4E0D9] rounded-xl p-5 bg-white">
      <h2 className="font-display text-md font-700 text-[#111A14] mb-1">Sistema de logros</h2>
      <p className="text-xs text-[#5A6B5E] mb-3">Participa, acumula puntos y gana reconocimientos</p>

      <div className="grid grid-cols-2 gap-2">
        {logros.map((l) => (
          <div
            key={l.id}
            className={`rounded-lg border p-2.5 flex items-center gap-2.5 transition-all ${
              l.desbloqueado ? 'border-[#B8D9C5] bg-[#F4FBF6]' : 'border-[#E8EDE9] bg-[#F8F9F8] opacity-50 grayscale'
            }`}
          >
            <div className="text-2xl flex-shrink-0">{l.icono}</div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-[#111A14] truncate">{l.titulo}</div>
              <div className="text-2xs text-[#5A6B5E] leading-tight">{l.descripcion}</div>
              <div className="text-2xs font-semibold text-[#16643A] mt-0.5">+{l.puntos} pts</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
