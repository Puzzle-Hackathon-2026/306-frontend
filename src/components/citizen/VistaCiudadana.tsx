import { useState } from "react";
import { horarios } from "../../data/ciudadana";
import ColoniaSelector from "./ColoniaSelector";
import EstadoTiempoReal from "./EstadoTiempoReal";
import CalendarioSemanal from "./CalendarioSemanal";

export default function VistaCiudadana() {
  const [colonia, setColonia] = useState("Col. Las Palmas");
  const info = horarios[colonia];

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
        <ColoniaSelector value={colonia} onChange={setColonia} />
      </div>

      <EstadoTiempoReal colonia={colonia} info={info} />

      <div>
        {/* barra de calendario horizontal, decida marcelo */}
        <CalendarioSemanal info={info} />
        {/* reportes se quitaron de aquí, van en un popup */}
      </div>
      {/* notificaciones se quitaron de aquí, van en un botón cascada */}
    </section>
  );
}
