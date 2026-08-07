import { useState } from "react";
import MapaCoberturaLeaflet from "./MapaCoberturaLeaflet";
import MapaReportesLeaflet from "./MapaReportesLeaflet";

type VistaMapa = "cobertura" | "reportes";

const opciones: { id: VistaMapa; label: string }[] = [
  { id: "cobertura", label: "Cobertura por zona" },
  { id: "reportes", label: "Reportes ciudadanos" },
];

export default function MapaAdmin() {
  const [vista, setVista] = useState<VistaMapa>("cobertura");

  return (
    <div className="bg-white rounded-2xl border border-[#D4E0D9] shadow-sm overflow-hidden">
      {/* ===================== LEYENDA ===================== */}

      <div className="px-6 py-4 border-b border-[#E5ECE8]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Leyenda */}

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="text-sm font-medium text-[#111A14]">
                Pendiente
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
              <span className="text-sm font-medium text-[#111A14]">
                En progreso
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-600"></span>
              <span className="text-sm font-medium text-[#111A14]">
                Cubierta
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-gray-400"></span>
              <span className="text-sm font-medium text-[#111A14]">
                No programada
              </span>
            </div>
          </div>

          {/* Botones */}

          <div className="flex gap-2">
            {opciones.map((o) => (
              <button
                key={o.id}
                onClick={() => setVista(o.id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  vista === o.id
                    ? "bg-[#16643A] text-white"
                    : "bg-[#F0F4F1] text-[#5A6B5E] hover:bg-[#E5ECE8]"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ===================== MAPA ===================== */}

      <div className="h-[620px]">
        {vista === "cobertura" ? (
          <MapaCoberturaLeaflet />
        ) : (
          <MapaReportesLeaflet />
        )}
      </div>

      {/* ===================== FOOTER ===================== */}

      <div className="px-6 py-4 border-t border-[#E5ECE8]">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-[#111A14]">
              Mapa de la ciudad
            </h2>

            <p className="text-sm text-[#5A6B5E]">
              San Pedro Sula · Vista en tiempo real
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm text-[#5A6B5E]">Mostrando cobertura actual</p>

            <p className="text-xs text-[#9CA3AF]">Actualización automática</p>
          </div>
        </div>
      </div>
    </div>
  );
}
