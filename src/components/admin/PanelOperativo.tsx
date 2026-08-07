import { useEffect, useState } from "react";

import MapaAdmin from "./mapa/MapaAdmin";
import KpisOperativo from "./KpisOperativo";
import MapaCobertura from "./MapaCobertura";
import EstadoFlota from "./EstadoFlota";
import ReportesCiudadanos from "./ReportesCiudadanos";
import RegistroRutas from "./RegistroRutas";

import GraficoIndice from "../comunidad/GraficoIndice";
import RecomendacionesPriorizacion from "../comunidad/RecomendacionesPriorizacion";
import AlertasZonas from "../comunidad/AlertasZonas";
import MapaBrechas from "../comunidad/MapaBrechas";
import CoberturaKPIs from "../comunidad/CoberturaKPIs";

export default function PanelOperativo() {
  const [fechaHora, setFechaHora] = useState(new Date());

  useEffect(() => {
    const intervalo = setInterval(() => {
      setFechaHora(new Date());
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  const fecha = fechaHora.toLocaleDateString("es-HN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const hora = fechaHora.toLocaleTimeString("es-HN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const capitalizar = (texto: string) =>
    texto.charAt(0).toUpperCase() + texto.slice(1);

  return (
    <section className="space-y-6">
      {/* ENCABEZADO */}

      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#16643A]">
          Panel interno · Operativo
        </p>

        <h1 className="font-display text-3xl font-extrabold text-[#111A14]">
          Panel de operaciones
        </h1>

        <p className="text-[13px] text-[#5A6B5E] mt-1">
          {capitalizar(fecha)} · {hora}
        </p>
      </div>

      {/* KPIs */}

      <KpisOperativo />

      <MapaAdmin />

      {/* Cobertura + Flota */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MapaCobertura />

        <EstadoFlota />
      </div>

      {/* Índice */}

      <GraficoIndice />

      {/* Reportes */}

      <ReportesCiudadanos />

      {/* Rutas */}

      <RegistroRutas />

      {/* Cobertura Equitativa */}

      <div className="space-y-4">
        <h2 className="text-[13px] font-semibold text-[#16643A] uppercase tracking-wide">
          Cobertura equitativa
        </h2>

        <CoberturaKPIs />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MapaBrechas />

          <AlertasZonas />
        </div>

        <RecomendacionesPriorizacion />
      </div>

      {/* MAPA GENERAL (ÚLTIMO) */}
    </section>
  );
}
