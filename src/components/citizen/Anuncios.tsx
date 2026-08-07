import { useState } from "react";
import { useAnuncios } from "../../hooks/useAnuncios";
import { formatRelativeTime } from "../../lib/formatRelativeTime";

export default function Anuncios() {
  const [visible, setVisible] = useState(true);
  const { anuncios, loading, error } = useAnuncios();

  if (!visible) return null;

  return (
    <div className="border border-[#D4E0D9] rounded-xl p-5 bg-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-sm font-700 text-[#111A14]">
          Anuncios
        </h2>
        <button
          onClick={() => setVisible(false)}
          className="text-xs text-[#5A6B5E] hover:text-[#111A14]"
        >
          Cerrar
        </button>
      </div>

      {loading && (
        <p className="text-xs text-[#5A6B5E]">Cargando anuncios...</p>
      )}
      {error && <p className="text-xs text-red-600">Error: {error}</p>}
      {!loading && !error && anuncios.length === 0 && (
        <p className="text-xs text-[#5A6B5E]">No hay anuncios por ahora.</p>
      )}

      <div className="space-y-2">
        {anuncios.map((a) => (
          <div
            key={a.id}
            className="flex items-start gap-3 rounded-lg p-3 border"
            style={{ backgroundColor: "#EFF6FF", borderColor: "#BFDBFE" }}
          >
            <div
              className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
              style={{ backgroundColor: "#2563EB" }}
            />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-[#111A14]">
                {a.titulo}
              </div>
              <div className="text-sm text-[#111A14]">{a.descripcion}</div>
            </div>
            <div className="text-xs text-[#5A6B5E] flex-shrink-0">
              {formatRelativeTime(a.createdAt)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
