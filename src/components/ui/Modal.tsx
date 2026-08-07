import { useEffect } from "react";

interface Props {
  abierto: boolean;
  onClose: () => void;
  children: React.ReactNode;
  titulo?: string;
}

export default function Modal({ abierto, onClose, children, titulo }: Props) {
  // Cerrar con Escape
  useEffect(() => {
    if (!abierto) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [abierto, onClose]);

  // Evitar que el fondo haga scroll mientras el modal está abierto
  useEffect(() => {
    if (!abierto) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [abierto]);

  if (!abierto) return null;

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Fondo oscuro */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Contenido — detiene el click para no cerrar al hacer click adentro */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-3 sticky top-0 bg-white">
          {titulo && (
            <h2 className="font-display text-[15px] font-700 text-[#111A14]">
              {titulo}
            </h2>
          )}
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="ml-auto w-8 h-8 rounded-full flex items-center justify-center text-[#5A6B5E] hover:bg-[#F0F4F1] hover:text-[#111A14] transition-colors text-lg"
          >
            ×
          </button>
        </div>
        <div className="px-5 pb-5">{children}</div>
      </div>
    </div>
  );
}
