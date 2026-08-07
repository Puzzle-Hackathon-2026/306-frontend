import { rutasCompletadas } from '../../data/operativo'

export default function RegistroRutas() {
  return (
    <div className="border border-[#D4E0D9] rounded-xl p-5 bg-white">
      <h2 className="font-display text-md font-700 text-[#111A14] mb-4">Registro de rutas completadas</h2>

      <div className="space-y-2">
        {rutasCompletadas.map((ruta, i) => (
          <div key={i} className="flex items-center gap-4 border border-[#D4E0D9] rounded-lg px-4 py-2.5 hover:bg-[#F8F9F8]">
            <span className="text-xs text-[#5A6B5E] font-mono" style={{ minWidth: 48 }}>{ruta.fecha}</span>
            <span className="text-xs text-[#5A6B5E] font-mono" style={{ minWidth: 40 }}>{ruta.hora}</span>
            <span className="text-xs font-semibold text-[#16643A] font-mono" style={{ minWidth: 52 }}>{ruta.camion}</span>
            <span className="text-sm text-[#111A14] flex-1">{ruta.zona}</span>
            <span className="text-xs text-[#5A6B5E] hidden sm:block">{ruta.distancia}</span>
            <span className="text-xs text-[#5A6B5E] hidden md:block">{ruta.duracion}</span>
            <span className="text-xs px-2 py-0.5 bg-[#E8F2EC] text-[#16643A] rounded font-semibold">Completada</span>
          </div>
        ))}
      </div>
    </div>
  )
}
