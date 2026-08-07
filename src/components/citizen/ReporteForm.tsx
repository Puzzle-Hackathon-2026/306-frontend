import { useState } from "react";
import { apiFetch } from "../../lib/api";
import { useColonias } from "../../hooks/useColonias";
import { useAuth } from "../../context/AuthContext";

// Coordenadas de respaldo (centro de San Pedro Sula) si el navegador
// no da permiso de geolocalización o falla.
const COORD_RESPALDO = { lat: 15.5, lng: -88.025 };

// Mapea las etiquetas visibles en español a los códigos exactos que acepta el backend.
const CATEGORIAS: { label: string; valor: string }[] = [
    { label: "Basura acumulada", valor: "basura_acumulada" },
    { label: "Camión no pasó en fecha programada", valor: "camion_no_paso" },
    { label: "Punto ilegal de disposición", valor: "botadero_ilegal" },
    { label: "Desbordamiento de contenedor", valor: "basurero_desbordado" },
    { label: "Recolección omitida", valor: "recoleccion_omitida" },
];

interface ReporteDto {
    id: string;
    categoria: string;
    descripcion: string;
    lat: number;
    lng: number;
    coloniaId: string | null;
    coloniaNombre: string | null;
    estado: string;
    fotoUrl: string | null;
    usuarioId: string;
    createdAt: string;
    updatedAt: string;
}

interface Props {
    onClose: () => void;
}

function obtenerUbicacion(): Promise<{ lat: number; lng: number }> {
    return new Promise((resolve) => {
        if (!navigator.geolocation) {
            console.warn("Geolocalización no soportada por este navegador, usando respaldo.");
            resolve(COORD_RESPALDO);
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
            (err) => {
                console.warn(`Geolocalización falló (código ${err.code}): ${err.message}. Usando respaldo.`);
                resolve(COORD_RESPALDO);
            },
            { timeout: 8000, enableHighAccuracy: false }
        );
    });
}

export default function ReporteForm({ onClose }: Props) {
    const { usuario, loading: cargandoSesion } = useAuth();
    const { colonias, loading: loadingColonias } = useColonias();
    const [categoria, setCategoria] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [coloniaId, setColoniaId] = useState("");
    const [enviando, setEnviando] = useState(false);
    const [enviado, setEnviado] = useState<ReporteDto | null>(null);
    const [error, setError] = useState<string | null>(null);

    const enviarReporte = async () => {
        if (!categoria || !usuario || enviando) return;
        setEnviando(true);
        setError(null);

        try {
            const coloniaSeleccionada = colonias.find((c) => c.id === coloniaId);
            const { lat, lng } = coloniaSeleccionada
                ? { lat: coloniaSeleccionada.lat, lng: coloniaSeleccionada.lng }
                : await obtenerUbicacion();

            const payload = {
                categoria,
                descripcion,
                lat,
                lng,
                coloniaId: coloniaId || null,
                fotoUrl: null,
                usuarioId: usuario.id,
            };

            const reporte = await apiFetch<ReporteDto>("/api/reports", {
                method: "POST",
                body: JSON.stringify(payload),
            });

            setEnviado(reporte);
            setCategoria("");
            setDescripcion("");
            setColoniaId("");
        } catch (err) {
            setError(err instanceof Error ? err.message : "No se pudo enviar el reporte");
        } finally {
            setEnviando(false);
        }
    };

    // Si aún se está resolviendo la sesión (recién cargó la página), evita
    // parpadear el mensaje de "inicia sesión" antes de tiempo.
    if (cargandoSesion) {
        return <p className="text-center text-[13px] text-[#5A6B5E] py-8">Cargando...</p>;
    }

    // Sin sesión, no hay a quién asociar el reporte — el backend lo exige.
    if (!usuario) {
        return (
            <div className="text-center py-8 space-y-3">
                <p className="text-[13px] text-[#5A6B5E]">
                    Necesitas iniciar sesión para reportar un incidente.
                </p>
                <p className="text-[12px] text-[#5A6B5E]">
                    Usa el botón de perfil (arriba a la derecha) para iniciar sesión o crear una cuenta.
                </p>
                <button
                    onClick={onClose}
                    className="mt-2 px-5 py-2 rounded-md border border-[#D4E0D9] text-[13px] text-[#5A6B5E] hover:bg-gray-50"
                >
                    Cerrar
                </button>
            </div>
        );
    }

    if (enviado) {
        return (
            <div className="border border-[#B8D9C5] bg-[#F4FBF6] rounded-xl p-5 flex flex-col items-center justify-center py-10 gap-3 text-center">
                <div className="w-12 h-12 bg-[#16643A] rounded-full flex items-center justify-center text-white text-xl">
                    ✓
                </div>
                <div className="font-display text-[16px] font-700 text-[#16643A]">Reporte enviado</div>
                <button
                    onClick={onClose}
                    className="text-[12px] text-[#16643A] font-semibold underline mt-2"
                >
                    Cerrar
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <p className="text-[11px] text-[#5A6B5E]">
                Reportando como <span className="font-semibold">{usuario.nombre}</span>
            </p>

            <div>
                <label className="block text-[11px] font-semibold tracking-wider text-[#5A6B5E] uppercase mb-1.5">
                    Categoría
                </label>
                <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className="w-full border border-[#D4E0D9] rounded-md px-3 py-2 text-[13px] text-[#111A14] bg-white focus:outline-none focus:ring-2 focus:ring-[#16643A]"
                >
                    <option value="">Seleccionar categoría...</option>
                    {CATEGORIAS.map((c) => (
                        <option key={c.valor} value={c.valor}>
                            {c.label}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-[11px] font-semibold tracking-wider text-[#5A6B5E] uppercase mb-1.5">
                    Colonia
                </label>
                <select
                    value={coloniaId}
                    onChange={(e) => setColoniaId(e.target.value)}
                    disabled={loadingColonias}
                    className="w-full border border-[#D4E0D9] rounded-md px-3 py-2 text-[13px] text-[#111A14] bg-white focus:outline-none focus:ring-2 focus:ring-[#16643A]"
                >
                    <option value="">Sin especificar</option>
                    {colonias.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.nombre}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-[11px] font-semibold tracking-wider text-[#5A6B5E] uppercase mb-1.5">
                    Descripción
                </label>
                <textarea
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    placeholder="Describe el problema con detalle..."
                    rows={4}
                    className="w-full border border-[#D4E0D9] rounded-md px-3 py-2 text-[13px] text-[#111A14] bg-white focus:outline-none focus:ring-2 focus:ring-[#16643A] resize-none"
                />
            </div>

            <p className="text-[10px] text-[#5A6B5E]">
                📍 Se usará la ubicación de la colonia seleccionada. Si no eliges ninguna, se
                intentará usar tu ubicación actual.
            </p>

            {error && <p className="text-[11px] text-red-600">{error}</p>}

            <button
                onClick={enviarReporte}
                disabled={!categoria || enviando}
                className="w-full bg-[#16643A] text-white py-2.5 rounded-md text-[13px] font-semibold disabled:opacity-40 hover:bg-[#1A7A46] transition-colors"
            >
                {enviando ? "Enviando..." : "Enviar reporte"}
            </button>
        </div>
    );
}