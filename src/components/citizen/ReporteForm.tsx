import { useState } from "react";
import { tiposProblema } from "../../data/ciudadana";

interface Props {
  onClose: () => void;
}

/**
 * Campos del modelo de reporte (referencia):
 *   categoria, longitud, latitud, descripcion, colonia_id,
 *   estado, usuario_id, created_at, updated_at
 *
 * Por ahora solo se capturan categoria + descripcion.
 * longitud/latitud/colonia_id/estado/usuario_id quedan para
 * cuando exista geolocalización y login — ver TODOs abajo.
 */
export default function ReporteForm({ onClose }: Props) {
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [enviado, setEnviado] = useState(false);

  const enviarReporte = () => {
    if (!categoria) return;

    const payload = {
      categoria,
      descripcion,
      // TODO: llenar con navigator.geolocation cuando se implemente
      latitud: null as number | null,
      longitud: null as number | null,
      // TODO: colonia_id cuando exista catálogo de colonias con id
      // TODO: estado por defecto "pendiente" lo pone el backend
      // TODO: usuario_id vendrá del login
    };

    // TODO: reemplazar por POST real al backend
    console.log("Reporte a enviar:", payload);

    setEnviado(true);
    setTimeout(() => {
      setEnviado(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-[11px] font-semibold tracking-wider text-[#5A6B5E] uppercase mb-1.5">
          Categoría
        </label>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="w-full border border-[#D4E0D9] rounded-md px-3 py-2 text-[13px] text-[#111A14] bg-white focus:outline-none focus:ring-2 focus:ring-[#16643A]"
        >
          <option value="">Seleccionar categoría...</option>
          {tiposProblema.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-[11px] font-semibold tracking-wider text-[#5A6B5E] uppercase mb-1.5">
          Descripción
        </label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Describe el problema con detalle..."
          rows={4}
          className="w-full border border-[#D4E0D9] rounded-md px-3 py-2 text-[13px] text-[#111A14] bg-white focus:outline-none focus:ring-2 focus:ring-[#16643A] resize-none"
        />
      </div>

      <p className="text-[10px] text-[#5A6B5E]">
        📍 La ubicación exacta se agregará automáticamente próximamente.
      </p>

      <button
        onClick={enviarReporte}
        disabled={!categoria}
        className="w-full bg-[#16643A] text-white py-2.5 rounded-md text-[13px] font-semibold disabled:opacity-40 hover:bg-[#1A7A46] transition-colors"
      >
        Enviar reporte
      </button>
    </div>
  );
}
