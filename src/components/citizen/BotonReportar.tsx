interface Props {
  onClick: () => void;
}

export default function BotonReportar({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-[1000] flex items-center gap-2 rounded-full bg-[#FFED29] hover:bg-[#CCBD20] px-6 py-3.5 text-sm font-bold text-[#111A14] shadow-lg shadow-black/10 transition-colors"
    >
      <span className="text-md" aria-hidden="true">
        🗑️
      </span>
      Reportar incidente
    </button>
  );
}
