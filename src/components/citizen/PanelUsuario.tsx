import VistaCiudadana from "./VistaCiudadana";
import ComunidadView from "../comunidad/ComunidadView";
import BotonReportar from "./BotonReportar";

/**
 * Vista pública combinada (ruta "/"): ciudadano + comunidad, más el
 * botón flotante de reporte. App.tsx solo decide entre esto y el
 * panel operativo (admin).
 */
export default function PanelUsuario() {
  return (
    <>
      <VistaCiudadana />
      <ComunidadView />
      <BotonReportar />
    </>
  );
}
