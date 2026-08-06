import { diasSemana, type HorarioColonia } from '../../data/ciudadana'

const NOMBRE_DIA: Record<string, string> = {
  Lun: 'Lunes', Mar: 'Martes', Mié: 'Miércoles', Jue: 'Jueves', Vie: 'Viernes', Sáb: 'Sábado',
}

// TODO: calcular el día de "hoy" dinámicamente en vez de fijarlo.
const HOY = 'Mar'

interface Props {
  info: HorarioColonia
}

export default function CalendarioSemanal({ info }: Props) {
  return (
    <div className="border border-[#D4E0D9] rounded-xl p-5 bg-white">
      <h2 className="font-display text-[15px] font-700 text-[#111A14] mb-4">
        Calendario de recolección
      </h2>

      <div className="grid grid-cols-6 gap-2 mb-4">
        {diasSemana.map((dia) => {
          const nombre = NOMBRE_DIA[dia]
          const activo = info.dias.includes(nombre)
          const esHoy = dia === HOY

          return (
            <div
              key={dia}
              className={`rounded-lg p-2 text-center border ${
                activo
                  ? esHoy
                    ? 'bg-[#16643A] border-[#16643A] text-white'
                    : 'bg-[#E8F2EC] border-[#B8D9C5] text-[#16643A]'
                  : 'bg-[#F8F9F8] border-[#E8EDE9] text-[#B0BDB5]'
              }`}
            >
              <div className="text-[10px] font-semibold tracking-wide">{dia}</div>
              <div className="text-[18px] mt-1">{activo ? '🗑️' : '·'}</div>
              {esHoy && <div className="text-[9px] mt-0.5 font-bold">HOY</div>}
            </div>
          )
        })}
      </div>

      <div className="border-t border-[#D4E0D9] pt-3 text-[12px] text-[#5A6B5E]">
        <span className="font-semibold text-[#111A14]">Días de recolección:</span> {info.dias.join(', ')} ·{' '}
        <span className="font-semibold">{info.hora} hrs</span>
      </div>

      <div className="mt-2 flex items-center gap-3 text-[11px]">
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 bg-[#16643A] rounded-sm inline-block" />Recolección
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 bg-[#E8F2EC] border border-[#B8D9C5] rounded-sm inline-block" />Otros días
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 bg-[#F8F9F8] border border-[#E8EDE9] rounded-sm inline-block" />No pasa
        </span>
      </div>
    </div>
  )
}
