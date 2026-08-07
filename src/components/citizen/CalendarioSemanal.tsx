import { diasSemana } from "../../data/ciudadana";

// A qué número ISO (Lun=1 ... Sáb=6) corresponde cada columna que mostramos.
// Domingo (7) no se muestra en el calendario semanal actual.
const ISO_POR_COLUMNA: Record<string, number> = {
  Lun: 1,
  Mar: 2,
  Mié: 3,
  Jue: 4,
  Vie: 5,
  Sáb: 6,
};

// JS getDay(): 0=Domingo, 1=Lunes ... 6=Sábado
const DIAS_JS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

function formatHoraInicio(horaInicioRecoleccion: string | null): string {
  if (!horaInicioRecoleccion) return "";
  return `${horaInicioRecoleccion.slice(0, 5)} hrs`;
}

interface Props {
  diaRecoleccion: string;
  diasRecoleccionIso: number[];
  horaInicioRecoleccion: string | null;
}

export default function CalendarioSemanal({
  diaRecoleccion,
  diasRecoleccionIso,
  horaInicioRecoleccion,
}: Props) {
  const hoy = DIAS_JS[new Date().getDay()];

  return (
    <div className="border border-[#D4E0D9] rounded-xl p-5 bg-white">
      <h2 className="font-display text-[15px] font-700 text-[#111A14] mb-4">
        Calendario de recolección
      </h2>
      <div className="grid grid-cols-6 gap-2 mb-4">
        {diasSemana.map((dia) => {
          const iso = ISO_POR_COLUMNA[dia];
          const activo = diasRecoleccionIso.includes(iso);
          const esHoy = dia === hoy;
          return (
            <div
              key={dia}
              className={`rounded-lg p-2 text-center border ${
                activo
                  ? esHoy
                    ? "bg-[#16643A] border-[#16643A] text-white"
                    : "bg-[#E8F2EC] border-[#B8D9C5] text-[#16643A]"
                  : "bg-[#F8F9F8] border-[#E8EDE9] text-[#B0BDB5]"
              }`}
            >
              <div className="text-[10px] font-semibold tracking-wide">
                {dia}
              </div>
              <div className="text-[18px] mt-1">{activo ? "🗑️" : "·"}</div>
              {esHoy && <div className="text-[9px] mt-0.5 font-bold">HOY</div>}
            </div>
          );
        })}
      </div>
      <div className="border-t border-[#D4E0D9] pt-3 text-[12px] text-[#5A6B5E]">
        <span className="font-semibold text-[#111A14]">
          Días de recolección:
        </span>{" "}
        {diaRecoleccion}{" "}
        <span className="font-semibold">
          {formatHoraInicio(horaInicioRecoleccion)}
        </span>
      </div>
    </div>
  );
}
