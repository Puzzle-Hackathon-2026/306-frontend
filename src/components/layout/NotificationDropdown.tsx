"use client";

import { useState, useRef, useEffect } from "react";

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
}

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const notifications: Notification[] = [
    {
      id: 1,
      title: "Nuevo reporte",
      message: "Se reportó basura en Barrio Río de Piedras.",
      time: "Hace 5 min",
    },
    {
      id: 2,
      title: "Reporte resuelto",
      message: "El reporte #142 fue resuelto.",
      time: "Hace 20 min",
    },
    {
      id: 3,
      title: "Nuevo comentario",
      message: "Un ciudadano comentó un reporte.",
      time: "Hace 1 hora",
    },
    {
      id: 4,
      title: "Reporte asignado",
      message: "Un reporte fue asignado a una cuadrilla.",
      time: "Hace 2 horas",
    },
    {
      id: 5,
      title: "Basura recolectada",
      message: "El reporte #125 fue completado.",
      time: "Ayer",
    },
    {
      id: 6,
      title: "Nuevo usuario",
      message: "Se registró un nuevo ciudadano.",
      time: "Ayer",
    },
    {
      id: 7,
      title: "Actualización",
      message: "El sistema fue actualizado correctamente.",
      time: "Hace 2 días",
    },
  ];

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

        {/* Contador */}
        <span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
          {notifications.length}
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-80 rounded-xl border border-gray-200 bg-white shadow-xl z-50 overflow-hidden">
          {/* Encabezado */}
          <div className="sticky top-0 bg-white border-b px-4 py-3">
            <h3 className="font-semibold text-[#2E5E4E]">Notificaciones</h3>
          </div>

          {/* Lista con scroll */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="border-b px-4 py-3 hover:bg-gray-50 cursor-pointer transition"
              >
                <p className="font-medium text-gray-800">
                  {notification.title}
                </p>

                <p className="text-sm text-gray-600">{notification.message}</p>

                <span className="text-xs text-gray-400">
                  {notification.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
