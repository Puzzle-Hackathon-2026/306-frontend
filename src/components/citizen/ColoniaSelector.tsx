import type { Colonia } from "../../hooks/useColonias";

interface Props {
    colonias: Colonia[];
    value: string;
    onChange: (coloniaId: string) => void;
    loading?: boolean;
}

export default function ColoniaSelector({ colonias, value, onChange, loading }: Props) {
    return (
        <div className="flex-shrink-0">
            <label className="block text-[11px] font-semibold tracking-wider text-[#5A6B5E] uppercase mb-1.5">
                Mi colonia
            </label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={loading || colonias.length === 0}
                className="border border-[#D4E0D9] rounded-md px-3 py-2 text-[13px] text-[#111A14] bg-white focus:outline-none focus:ring-2 focus:ring-[#16643A] min-w-[200px]"
            >
                {loading && <option>Cargando colonias...</option>}
                {!loading && colonias.length === 0 && <option>No hay colonias disponibles</option>}
                {colonias.map((c) => (
                    <option key={c.id} value={c.id}>
                        {c.nombre}
                    </option>
                ))}
            </select>
        </div>
    );
}
