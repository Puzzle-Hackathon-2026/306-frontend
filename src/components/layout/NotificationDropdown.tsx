"use client";

import { useState, useRef, useEffect } from "react";
import { useAnuncios } from "../../hooks/useAnuncios";
import { formatRelativeTime } from "../../lib/formatRelativeTime";

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { anuncios, loading, error } = useAnuncios();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Botón de la campana */}
      <button
        onClick={() => setOpen(!open)}
        className="relative w-10 h-10 rounded-full hover:bg-[#D4E0D9] transition flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-[#2E5E4E]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 17h5l-1.4-1.4A2 2 0 0118 14.17V11a6 6 0 10-12 0v3.17a2 2 0 01-.6 1.42L4 17h5m6 0a3 3 0 11-6 0h6z"
          />
        </svg>

        {/* Contador — real, no fijo en 7 */}
        {anuncios.length > 0 && (
          <span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {anuncios.length}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-80 rounded-xl border border-gray-200 bg-white shadow-xl z-50 overflow-hidden">
          {/* Encabezado */}
          <div className="sticky top-0 bg-white border-b px-4 py-3">
            <h3 className="font-semibold text-[#2E5E4E]">Anuncios</h3>
          </div>

          {/* Lista con scroll */}
          <div className="max-h-96 overflow-y-auto">
            {loading && (
              <p className="px-4 py-3 text-xs text-[#5A6B5E]">Cargando...</p>
            )}
            {error && (
              <p className="px-4 py-3 text-xs text-red-600">Error: {error}</p>
            )}
            {!loading && !error && anuncios.length === 0 && (
              <p className="px-4 py-3 text-xs text-[#5A6B5E]">
                Sin anuncios por ahora.
              </p>
            )}

            {anuncios.map((a) => (
              <div
                key={a.id}
                className="border-b px-4 py-3 hover:bg-gray-50 cursor-pointer transition"
              >
                <p className="font-medium text-gray-800">{a.titulo}</p>
                <p className="text-sm text-gray-600">{a.descripcion}</p>
                <span className="text-xs text-gray-400">
                  {formatRelativeTime(a.createdAt)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
