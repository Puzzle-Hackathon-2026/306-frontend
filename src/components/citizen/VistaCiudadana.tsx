import { useEffect, useState } from "react";
import { horarios } from "../../data/ciudadana";
import { useColonias } from "../../hooks/useColonias";
import ColoniaSelector from "./ColoniaSelector";
import EstadoTiempoReal from "./EstadoTiempoReal";
import CalendarioSemanal from "./CalendarioSemanal";

export default function VistaCiudadana() {
    const { colonias, loading } = useColonias();
    const [coloniaId, setColoniaId] = useState("");

    // Apenas llega la lista real del backend, selecciona la primera por default.
    useEffect(() => {
        if (!coloniaId && colonias.length > 0) {
            setColoniaId(colonias[0].id);
        }
    }, [colonias, coloniaId]);

    const coloniaSeleccionada = colonias.find((c) => c.id === coloniaId);

    // TODO: EstadoTiempoReal (hora/estado en vivo) todavía usa data de ejemplo
    // por nombre — vendrá de un endpoint de posiciones de camión aparte.
    // Si el nombre real no coincide con el mock, cae a un valor por default
    // para no romper el componente mientras tanto.
    const infoMock = coloniaSeleccionada
        ? horarios[coloniaSeleccionada.nombre] ?? {
            dias: [],
            hora: "--:--",
            estado: "pendiente" as const,
        }
        : { dias: [], hora: "--:--", estado: "pendiente" as const };

    return (
        <section className="space-y-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                    <p className="text-[11px] font-semibold tracking-widest text-[#16643A] uppercase mb-1">
                        Tu colonia
                    </p>
                    <h1 className="font-display text-3xl font-800 text-[#111A14] leading-none">
                        Tu colonia,
                        <br />
                        tu recolección.
                    </h1>
                </div>
                <ColoniaSelector
                    colonias={colonias}
                    value={coloniaId}
                    onChange={setColoniaId}
                    loading={loading}
                />
            </div>
            <EstadoTiempoReal colonia={coloniaSeleccionada?.nombre ?? ""} info={infoMock} />
            <div>
                <CalendarioSemanal
                    diaRecoleccion={coloniaSeleccionada?.diaRecoleccion ?? "Sin datos"}
                    diasRecoleccionIso={coloniaSeleccionada?.diasRecoleccionIso ?? []}
                />
            </div>
        </section>
    );
}
