import { useState } from "react";
import { horarios } from "../../data/ciudadana";
import ColoniaSelector from "./ColoniaSelector";
import EstadoTiempoReal from "./EstadoTiempoReal";
import CalendarioSemanal from "./CalendarioSemanal";
import ReportarProblema from "./ReportarProblema";
import Notificaciones from "./Notificaciones";

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
        {/*barra de calendario horizontal, denada marcelo*/}
        <CalendarioSemanal info={info} />
        {/*got rid of reports 4 now, cambiara a ser un popup.*/}
      </div>
      {/*got rid of notis 4 now , va a ser un boton cascadaish para las notis*/}
    </section>
  );
}
