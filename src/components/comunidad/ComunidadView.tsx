import CoberturaKPIs from './CoberturaKPIs'
import MapaBrechas from './MapaBrechas'
import AlertasZonas from './AlertasZonas'
import GraficoIndice from './GraficoIndice'
import RecomendacionesPriorizacion from './RecomendacionesPriorizacion'
import IncentivosBanner from './IncentivosBanner'
import GuiaSeparacion from './GuiaSeparacion'
import PuntosAcopio from './PuntosAcopio'
import CalendarioDiferenciado from './CalendarioDiferenciado'
import Logros from './Logros'

/**
 * Antes eran "Módulo B" (cobertura equitativa) y "Módulo C" (reciclaje)
 * en tabs separados. Ahora es una sola sección "Comunidad" con dos
 * bloques internos, uno por tema.
 */
export default function ComunidadView() {
  return (
    <section className="space-y-10">
      <div>
        <p className="text-[11px] font-semibold tracking-widest text-[#E8920A] uppercase mb-1">
          Comunidad
        </p>
        <h1 className="font-display text-3xl font-800 text-[#111A14] leading-none">
          Cobertura y reciclaje
        </h1>
        <p className="text-[13px] text-[#5A6B5E] mt-1">
          Brechas de servicio por colonia y participación ciudadana en reciclaje
        </p>
      </div>

      {/* Bloque 1: cobertura equitativa */}
      <div className="space-y-4">
        <h2 className="text-[13px] font-semibold text-[#16643A] uppercase tracking-wide">
          Cobertura equitativa
        </h2>
        <CoberturaKPIs />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MapaBrechas />
          <AlertasZonas />
        </div>
        <GraficoIndice />
        <RecomendacionesPriorizacion />
      </div>

      {/* Bloque 2: reciclaje y segregación */}
      <div className="space-y-4">
        <h2 className="text-[13px] font-semibold text-[#E8920A] uppercase tracking-wide">
          Reciclaje y segregación
        </h2>
        <IncentivosBanner />
        <GuiaSeparacion />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PuntosAcopio />
          <div className="space-y-4">
            <CalendarioDiferenciado />
            <Logros />
          </div>
        </div>
      </div>
    </section>
  )
}
