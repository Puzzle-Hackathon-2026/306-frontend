type EstadoRecoleccion = "pasó" | "en camino" | "pendiente" | "no pasa hoy";

const estadoConfig: Record<EstadoRecoleccion, { color: string; bg: string; icon: string; label: string }> = {
    "pasó": { color: "#16643A", bg: "#E8F2EC", icon: "✓", label: "Ya pasó hoy" },
    "en camino": { color: "#E8920A", bg: "#FEF3E2", icon: "→", label: "Está pasando ahora" },
    "pendiente": { color: "#2563EB", bg: "#EFF6FF", icon: "◷", label: "Pasa más tarde hoy" },
    "no pasa hoy": { color: "#6B7B6E", bg: "#F0F4F1", icon: "—", label: "No pasa hoy" },
};

// JS getDay(): 0=Domingo...6=Sábado. Nuestro sistema usa 1=Lunes...7=Domingo.
function isoDeHoy(): number {
    const dia = new Date().getDay();
    return dia === 0 ? 7 : dia;
}

// Convierte "HH:mm:ss" a minutos desde medianoche, para comparar horarios.
function horaAMinutos(hora: string): number {
    const [h, m] = hora.split(":").map(Number);
    return h * 60 + m;
}

function calcularEstado(
    diasRecoleccionIso: number[],
    horaInicio: string | null,
    horaFin: string | null
): EstadoRecoleccion {
    const hoy = isoDeHoy();
    if (!diasRecoleccionIso.includes(hoy)) return "no pasa hoy";
    if (!horaInicio || !horaFin) return "pendiente"; // sin horario definido, asumimos que aún no pasa

    const ahora = new Date();
    const minutosAhora = ahora.getHours() * 60 + ahora.getMinutes();
    const minutosInicio = horaAMinutos(horaInicio);
    const minutosFin = horaAMinutos(horaFin);

    if (minutosAhora < minutosInicio) return "pendiente";
    if (minutosAhora >= minutosInicio && minutosAhora <= minutosFin) return "en camino";
    return "pasó";
}

function formatRangoHora(horaInicio: string | null, horaFin: string | null): string {
    if (!horaInicio || !horaFin) return "--:--";
    return `${horaInicio.slice(0, 5)} - ${horaFin.slice(0, 5)}`;
}

interface Props {
    colonia: string;
    diasRecoleccionIso: number[];
    horaInicioRecoleccion: string | null;
    horaFinRecoleccion: string | null;
}

export default function EstadoTiempoReal({
    colonia,
    diasRecoleccionIso,
    horaInicioRecoleccion,
    horaFinRecoleccion,
}: Props) {
    const estadoCalculado = calcularEstado(diasRecoleccionIso, horaInicioRecoleccion, horaFinRecoleccion);
    const estado = estadoConfig[estadoCalculado];
    const rangoHora = formatRangoHora(horaInicioRecoleccion, horaFinRecoleccion);

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
                    <span className="font-semibold text-[#111A14]">{rangoHora} hrs</span>
                </div>
            </div>

            {estadoCalculado === "en camino" && (
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