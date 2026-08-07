import { useState } from "react";
import { usePuntosAcopio } from "../../hooks/usePuntosAcopio";
import { guiaSeparacion } from "../../data/comunidad";

export default function PuntosAcopio() {
  const { puntos, loading, error } = usePuntosAcopio();
  const [soloActivos, setSoloActivos] = useState(false);

  const puntosFiltrados = soloActivos ? puntos.filter((p) => p.activo) : puntos;

  return (
    <div className="border border-[#D4E0D9] rounded-xl p-5 bg-white">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-display text-sm font-700 text-[#111A14]">
            Puntos de acopio
          </h2>
          <p className="text-xs text-[#5A6B5E]">
            Centros de reciclaje cercanos
          </p>
        </div>
        <button
          onClick={() => setSoloActivos(!soloActivos)}
          className={`text-xs px-2.5 py-1.5 rounded-md font-semibold transition-colors ${
            soloActivos
              ? "bg-[#16643A] text-white"
              : "bg-[#F0F4F1] text-[#5A6B5E] hover:bg-[#E8F2EC]"
          }`}
        >
          Solo abiertos
        </button>
      </div>

      {loading && (
        <p className="text-xs text-[#5A6B5E]">Cargando puntos de acopio...</p>
      )}
      {error && <p className="text-xs text-red-600">{error}</p>}

      {!loading && !error && puntosFiltrados.length === 0 && (
        <p className="text-xs text-[#5A6B5E]">
          No hay puntos de acopio para mostrar.
        </p>
      )}

      <div className="space-y-2.5 overflow-y-auto max-h-[420px] pr-1">
        {puntosFiltrados.map((p) => (
          <div
            key={p.id}
            className={`rounded-lg border p-3 transition-colors ${
              p.activo
                ? "border-[#B8D9C5] bg-white hover:bg-[#F8FBF9]"
                : "border-[#D4E0D9] bg-[#F8F9F8] opacity-60"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full flex-shrink-0 ${p.activo ? "bg-[#16643A]" : "bg-[#6B7B6E]"}`}
                  />
                  <span className="text-sm font-semibold text-[#111A14] truncate">
                    {p.nombre}
                  </span>
                </div>
                <div className="text-xs text-[#5A6B5E] mt-0.5 ml-4">
                  {p.direccion || "Dirección no disponible"} ·{" "}
                  {p.horario || "Horario no disponible"}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mt-2 ml-4">
              {p.materialesAceptados?.map((m) => {
                const cfg = guiaSeparacion.find((g) => g.tipo === m);
                return (
                  <span
                    key={m}
                    className="text-2xs font-semibold px-1.5 py-0.5 rounded"
                    style={{
                      backgroundColor: cfg?.bg ?? "#F0F4F1",
                      color: cfg?.color ?? "#5A6B5E",
                    }}
                  >
                    {m}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
