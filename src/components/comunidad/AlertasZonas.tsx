import { coloniasCobertura, DIAS_UMBRAL_DESATENCION } from '../../data/comunidad'
import { getColorByIndice, getBgByIndice } from '../../lib/colorScale'

export default function AlertasZonas() {
  const desatendidas = coloniasCobertura
    .filter((c) => c.dias >= DIAS_UMBRAL_DESATENCION)
    .sort((a, b) => b.dias - a.dias)

  return (
    <div className="border border-[#D4E0D9] rounded-xl p-5 bg-white">
      <h2 className="font-display text-[15px] font-700 text-[#111A14] mb-1">Alertas — zonas desatendidas</h2>
      <p className="text-[11px] text-[#5A6B5E] mb-4">
        Colonias con más de {DIAS_UMBRAL_DESATENCION} días sin recolección
      </p>

      <div className="space-y-2">
        {desatendidas.map((c) => (
          <div
            key={c.nombre}
            className="flex items-center gap-3 rounded-lg p-3 border"
            style={{ backgroundColor: getBgByIndice(c.indice), borderColor: getColorByIndice(c.indice) + '44' }}
          >
            <div
              className="w-8 h-8 rounded-md flex items-center justify-center font-800 text-[13px] flex-shrink-0 font-display"
              style={{ backgroundColor: getColorByIndice(c.indice), color: '#fff' }}
            >
              {c.dias}d
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-semibold text-[#111A14] truncate">{c.nombre}</div>
              <div className="text-[10px] text-[#5A6B5E]">
                {c.poblacion.toLocaleString('es-HN')} hab · {c.reportes} reportes activos
              </div>
            </div>
            <div className="text-[10px] text-right flex-shrink-0">
              <div className="font-bold" style={{ color: getColorByIndice(c.indice) }}>Índice {c.indice}</div>
              <div className="text-[#5A6B5E]">Últ: {c.ultimaVisita}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
