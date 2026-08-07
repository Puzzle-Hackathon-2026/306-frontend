import { useRoute } from "./lib/router";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import VistaCiudadana from "./components/citizen/VistaCiudadana";
import ComunidadView from "./components/comunidad/ComunidadView";
import PanelOperativo from "./components/admin/PanelOperativo";
import PanelUsuario from "./components/citizen/PanelUsuario";

/**
 * Rutas:
 *  "/"          -> app pública (ciudadano): estado de recolección + comunidad
 *  "/operativo" -> panel interno (futuro: protegido por login de admin)
 *
 * No hay tabs en el header a propósito: la vista pública es una sola
 * página continua, y "/operativo" no se enlaza desde la UI todavía.
 */
export default function App() {
  const path = useRoute();
  const esOperativo = path.startsWith("/operativo");

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-14">
        {esOperativo ? (
          <PanelOperativo />
        ) : (
          <>
            <PanelUsuario />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
