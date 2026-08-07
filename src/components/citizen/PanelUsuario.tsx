import { useState } from "react";
import VistaCiudadana from "./VistaCiudadana";
import ComunidadView from "../comunidad/ComunidadView";
import BotonReportar from "./BotonReportar";
import ReporteForm from "./ReporteForm";
import Modal from "../ui/Modal";

export default function PanelUsuario() {
  const [formAbierto, setFormAbierto] = useState(false);

  return (
    <>
      <VistaCiudadana />
      <ComunidadView />

      <BotonReportar onClick={() => setFormAbierto(true)} />

      <Modal
        abierto={formAbierto}
        onClose={() => setFormAbierto(false)}
        titulo="Reportar un problema"
      >
        <ReporteForm onClose={() => setFormAbierto(false)} />
      </Modal>
    </>
  );
}
