import { camiones, type EstadoCamion } from '../../data/operativo'

const cfgEstado: Record<EstadoCamion, { color: string; bg: string; label: string }> = {
  activo: { color: '#16643A', bg: '#E8F2EC', label: 'Activo' },
  'en pausa': { color: '#E8920A', bg: '#FEF3E2', label: 'En pausa' },
  'con incidente': { color: '#DC2626', bg: '#FEF2F2', label: 'Con incidente' },
  'fuera de ruta': { color: '#6B7B6E', bg: '#F0F4F1', label: 'Fuera de ruta' },
}

export default function EstadoFlota() {
  return (
    <div className="lg:col-span-2 border border-[#D4E0D9] rounded-xl p-5 bg-white">
      <h2 className="font-display text-[15px] font-700 text-[#111A14] mb-4">Estado de la flota</h2>

      <div className="space-y-2 overflow-y-auto max-h-[340px] pr-1">
        {camiones.map((cam) => {
          const cfg = cfgEstado[cam.estado]
          return (
            <div key={cam.id} className="flex items-center gap-3 border border-[#D4E0D9] rounded-lg p-3 bg-white hover:border-[#B8D9C5] transition-colors">
              <div className="text-[11px] font-semibold font-mono text-[#5A6B5E]" style={{ minWidth: 52 }}>
                {cam.id}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[12px] font-semibold text-[#111A14] truncate">{cam.conductor}</div>
                <div className="text-[11px] text-[#5A6B5E] truncate">{cam.zona}</div>
              </div>
              <div className="w-20 hidden sm:block">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[10px] text-[#5A6B5E]">Avance</span>
                  <span className="text-[10px] font-semibold text-[#111A14]">{cam.progreso}%</span>
                </div>
                <div className="h-1.5 bg-[#F0F4F1] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${cam.progreso}%`, backgroundColor: cfg.color }} />
                </div>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                {cam.reportes > 0 && (
                  <span className="text-[10px] bg-[#FEF2F2] text-[#DC2626] px-1.5 py-0.5 rounded font-semibold">
                    {cam.reportes} rep.
                  </span>
                )}
                <span className="text-[10px] px-2 py-0.5 rounded font-semibold" style={{ backgroundColor: cfg.bg, color: cfg.color }}>
                  {cfg.label}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
