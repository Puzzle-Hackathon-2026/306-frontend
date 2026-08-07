import { useEffect } from "react";
import { useRoute, navigate } from "./lib/router";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import PanelOperativo from "./components/admin/PanelOperativo";
import PanelUsuario from "./components/citizen/PanelUsuario";

/**
 * Rutas:
 *  "/"          -> app pública (ciudadano): estado de recolección + comunidad
 *  "/operativo" -> panel interno, SOLO para usuarios con rol "empresa"
 */
export default function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

function AppContent() {
    const path = useRoute();
    const { usuario, loading } = useAuth();
    const esOperativo = path.startsWith("/operativo");
    const tieneAcceso = usuario?.rol === "empresa";

    // Cubre TODOS los casos: cerrar sesión estando en /operativo, escribir la
    // URL directo sin ser empresa, o que la sesión expire mientras la ves.
    useEffect(() => {
        if (loading) return;
        if (esOperativo && !tieneAcceso) {
            navigate("/");
        } else if (!esOperativo && tieneAcceso) {
            navigate("/operativo");
        }
    }, [esOperativo, loading, tieneAcceso]);

    const mostrarOperativo = esOperativo && !loading && tieneAcceso;
    const bloqueadoTemporalmente =
        (esOperativo && (loading || !tieneAcceso)) || (!esOperativo && !loading && tieneAcceso);

    return (
        <div className="min-h-screen bg-white font-sans">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-14">
                {bloqueadoTemporalmente ? (
                    <p className="text-center text-[#5A6B5E] py-20">
                        {loading ? "Cargando..." : "Redirigiendo..."}
                    </p>
                ) : mostrarOperativo ? (
                    <PanelOperativo />
                ) : (
                    <PanelUsuario />
                )}
            </main>

            <Footer />
        </div>
    );
}