import { useState } from "react";
import {
  logros,
  obtenerNivel,
  obtenerAccionesPuntos,
} from "../../data/comunidad";

export default function IncentivosBanner() {
  const [mostrarInfo, setMostrarInfo] = useState(false);

  // Temporal hasta conectar Supabase
  const usuario = {
    id: "",
    nombre: "Ana Rodríguez",
    puntos: 60,
  };

  const desbloqueados = logros.filter((l) => l.desbloqueado);

  const nivel = obtenerNivel(usuario.puntos);

  const faltan = Math.max(nivel.meta - usuario.puntos, 0);

  const progreso = Math.min((usuario.puntos / nivel.meta) * 100, 100);

  return (
    <div className="relative rounded-xl border border-[#B8D9C5] bg-[#F4FBF6] p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-[#16643A]">
            Tu cuenta · EcoVecino
          </h3>

          <button
            onClick={() => setMostrarInfo(!mostrarInfo)}
            className="w-5 h-5 rounded-full bg-[#EAF6EE] text-[#16643A] text-xs font-bold"
          >
            i
          </button>
        </div>

        <span className="text-lg font-bold text-[#16643A]">
          {usuario.puntos} pts
        </span>
      </div>

      <p className="text-xs text-[#5A6B5E] mb-3">
        {desbloqueados.length} logros desbloqueados · Nivel:{" "}
        <strong>{nivel.nombre}</strong>
      </p>

      <div className="flex justify-between text-[11px] text-[#5A6B5E] mb-1">
        <span>Próximo nivel: {nivel.siguiente ?? "Nivel máximo"}</span>

        <span>
          {usuario.puntos}/{nivel.meta} pts
        </span>
      </div>

      <div className="h-3 rounded-full bg-white border border-[#B8D9C5] overflow-hidden">
        <div
          className="h-full bg-[#16643A] transition-all"
          style={{ width: `${progreso}%` }}
        />
      </div>

      <p className="text-[10px] text-[#5A6B5E] mt-2">
        {nivel.siguiente
          ? `${faltan} puntos para subir a ${nivel.siguiente}`
          : "¡Has alcanzado el nivel máximo!"}
      </p>

      <div className="flex gap-2 mt-4">
        {desbloqueados.map((l) => (
          <div
            key={l.id}
            title={l.titulo}
            className="w-9 h-9 rounded-lg bg-white border border-[#B8D9C5] flex items-center justify-center text-xl shadow-sm"
          >
            {l.icono}
          </div>
        ))}
      </div>

      {mostrarInfo && (
        <div className="absolute top-full left-0 mt-3 w-[360px] rounded-xl border border-[#B8D9C5] bg-white shadow-xl p-4 z-50">
          <h4 className="font-semibold text-[#16643A] mb-3">
            ¿Cómo funcionan los EcoPuntos?
          </h4>

          <div className="mb-4">
            <p className="font-semibold text-xs mb-2">Niveles</p>

            <ul className="space-y-1 text-xs">
              <li>🌱 Reciclador Novato (0 - 99)</li>
              <li>♻️ Separador Responsable (100 - 249)</li>
              <li>🌿 Guardián Verde (250 - 499)</li>
              <li>🌳 Embajador Ambiental (500 - 999)</li>
              <li>🌎 Campeón Ambiental (1000+)</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-xs mb-2">
              Formas de ganar EcoPuntos
            </p>

            <ul className="space-y-1 text-xs">
              {obtenerAccionesPuntos().map((accion) => (
                <li key={accion.titulo}>
                  • {accion.titulo} (+{accion.puntos} pts)
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
