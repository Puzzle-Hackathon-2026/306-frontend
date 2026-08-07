export default function BotonReportar() {
  const handleClick = () => {
    // TODO: reemplazar por el modal/formulario real de reporte
    alert("Reportar incidente — próximamente");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-[1000] flex items-center gap-2 rounded-full bg-[#FFED29] hover:bg-[#CCBD20] px-6 py-3.5 text-[13px] font-bold text-[#111A14] shadow-lg shadow-black/10 transition-colors"
    >
      <span className="text-[16px]" aria-hidden="true">
        🗑️
      </span>
      Reportar incidente
    </button>
  );
}
