import KpisOperativo from './KpisOperativo'
import MapaCobertura from './MapaCobertura'
import EstadoFlota from './EstadoFlota'
import ReportesCiudadanos from './ReportesCiudadanos'
import RegistroRutas from './RegistroRutas'

/**
 * Vista interna, servida en /operativo. Todavía no tiene autenticación:
 * cuando se implementen cuentas admin, envolver esta vista en un guard
 * de sesión (redirigir a "/" si no hay sesión admin válida).
 */
export default function PanelOperativo() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-[11px] font-semibold tracking-widest text-[#5A6B5E] uppercase mb-1">
          Panel interno · Operativo
        </p>
        <h1 className="font-display text-3xl font-800 text-[#111A14] leading-none">
          Panel de operaciones
        </h1>
        <p className="text-[13px] text-[#5A6B5E] mt-1">Miércoles 6 de agosto, 2026 · 10:28 hrs</p>
      </div>

      <KpisOperativo />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MapaCobertura />
        <EstadoFlota />
      </div>

      <ReportesCiudadanos />
      <RegistroRutas />
    </section>
  )
}
