import { colonias } from '../../data/ciudadana'

interface Props {
  value: string
  onChange: (colonia: string) => void
}

export default function ColoniaSelector({ value, onChange }: Props) {
  return (
    <div className="flex-shrink-0">
      <label className="block text-[11px] font-semibold tracking-wider text-[#5A6B5E] uppercase mb-1.5">
        Mi colonia
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-[#D4E0D9] rounded-md px-3 py-2 text-[13px] text-[#111A14] bg-white focus:outline-none focus:ring-2 focus:ring-[#16643A] min-w-[200px]"
      >
        {colonias.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
    </div>
  )
}
