import type { HorarioColonia } from "../../data/ciudadana";

const estadoConfig = {
  pasó: { color: "#16643A", bg: "#E8F2EC", icon: "✓", label: "Ya pasó hoy" },
  "en camino": {
    color: "#E8920A",
    bg: "#FEF3E2",
    icon: "→",
    label: "En camino a tu zona",
  },
  pendiente: {
    color: "#2563EB",
    bg: "#EFF6FF",
    icon: "◷",
    label: "Pasa más tarde hoy",
  },
  "no pasa hoy": {
    color: "#6B7B6E",
    bg: "#F0F4F1",
    icon: "—",
    label: "No pasa hoy",
  },
} as const;

interface Props {
  colonia: string;
  info: HorarioColonia;
}

export default function EstadoTiempoReal({ colonia, info }: Props) {
  const estado = estadoConfig[info.estado];

  return (
    <div
      className="rounded-2xl p-6 flex items-center gap-6 border"
      style={{ backgroundColor: estado.bg, borderColor: estado.color + "33" }}
    >
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold flex-shrink-0 shadow-sm"
        style={{ backgroundColor: estado.color, color: "#fff" }}
      >
        {estado.icon}
      </div>

      <div className="flex-1">
        <div
          className="text-[11px] font-semibold tracking-widest uppercase mb-1"
          style={{ color: estado.color }}
        >
          Estado en tiempo real · {colonia}
        </div>
        <div className="font-display text-2xl font-700 text-[#111A14]">
          {estado.label}
        </div>
        <div className="text-[13px] text-[#5A6B5E] mt-1">
          Horario programado:{" "}
          <span className="font-semibold text-[#111A14]">{info.hora} hrs</span>
        </div>
      </div>

      {info.estado === "en camino" && (
        <div className="flex flex-col items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-[#E8920A] animate-ping" />
          <span className="text-[11px] text-[#E8920A] font-semibold">
            EN CAMINO
          </span>
        </div>
      )}
    </div>
  );
}
