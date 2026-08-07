import { logros, PUNTOS_USUARIO, PROXIMO_LOGRO_META } from '../../data/comunidad'

export default function IncentivosBanner() {
  const desbloqueados = logros.filter((l) => l.desbloqueado)
  const faltan = PROXIMO_LOGRO_META - PUNTOS_USUARIO

  return (
    <div className="rounded-2xl border border-[#B8D9C5] bg-gradient-to-r from-[#E8F2EC] to-[#FEF3E2] p-5 flex flex-col sm:flex-row items-center gap-5">
      <div>
        <div className="text-[11px] font-semibold tracking-widest text-[#5A6B5E] uppercase mb-0.5">
          Tu cuenta · EcoVecino
        </div>
        <div className="font-display text-3xl font-800 text-[#16643A]">{PUNTOS_USUARIO} pts</div>
        <div className="text-[12px] text-[#5A6B5E] mt-1">
          {desbloqueados.length} logros desbloqueados · Nivel: Reciclador Novato
        </div>
      </div>

      <div className="flex-1 w-full">
        <div className="flex justify-between text-[11px] text-[#5A6B5E] mb-1.5">
          <span>Próximo logro: Guardián Verde</span>
          <span>{PUNTOS_USUARIO}/{PROXIMO_LOGRO_META} pts</span>
        </div>
        <div className="h-3 bg-white rounded-full overflow-hidden border border-[#B8D9C5]">
          <div
            className="h-full bg-[#16643A] rounded-full transition-all"
            style={{ width: `${(PUNTOS_USUARIO / PROXIMO_LOGRO_META) * 100}%` }}
          />
        </div>
        <div className="text-[10px] text-[#5A6B5E] mt-1">{faltan} puntos más para desbloquear el siguiente logro</div>
      </div>

      <div className="flex gap-2 flex-shrink-0">
        {desbloqueados.map((l) => (
          <div key={l.id} title={l.titulo} className="w-9 h-9 rounded-lg bg-white border border-[#B8D9C5] flex items-center justify-center text-xl shadow-sm">
            {l.icono}
          </div>
        ))}
      </div>
    </div>
  )
}
