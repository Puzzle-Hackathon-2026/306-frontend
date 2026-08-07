import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useColonias } from "../../hooks/useColonias";

interface Props {
    open: boolean;
    onClose: () => void;
}

type Screen = "home" | "login" | "register" | "profile";

export default function AccountModal({ open, onClose }: Props) {
    const { usuario, loading: cargandoSesion, signIn, signUp, signOut } = useAuth();
    const { colonias, loading: loadingColonias } = useColonias();

    const [screen, setScreen] = useState<Screen>("home");
    const [cargando, setCargando] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [registerName, setRegisterName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerColoniaId, setRegisterColoniaId] = useState("");

    // Si ya hay sesión activa (ej. recargaste la página), salta directo al perfil.
    useEffect(() => {
        if (usuario && screen === "home") setScreen("profile");
    }, [usuario, screen]);

    if (!open) return null;

    const manejarLogin = async () => {
        if (cargando) return;
        setErrorMsg("");
        if (!loginEmail || !loginPassword) {
            setErrorMsg("Completa tu correo y contraseña.");
            return;
        }
        setCargando(true);
        const { error } = await signIn(loginEmail, loginPassword);
        setCargando(false);
        if (error) {
            setErrorMsg(error);
            return;
        }
        setLoginEmail("");
        setLoginPassword("");
        setScreen("profile");
    };

    const manejarRegistro = async () => {
        if (cargando) return;
        setErrorMsg("");
        if (!registerName || !registerEmail || !registerPassword) {
            setErrorMsg("Completa todos los campos.");
            return;
        }
        if (registerPassword.length < 6) {
            setErrorMsg("La contraseña debe tener al menos 6 caracteres.");
            return;
        }
        setCargando(true);
        const { error } = await signUp(
            registerName,
            registerEmail,
            registerPassword,
            registerColoniaId || null
        );
        setCargando(false);
        if (error) {
            setErrorMsg(error);
            return;
        }
        setRegisterName("");
        setRegisterEmail("");
        setRegisterPassword("");
        setRegisterColoniaId("");
        setScreen("profile");
    };

    const manejarCerrarSesion = async () => {
        await signOut();
        setScreen("home");
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="relative bg-white rounded-2xl shadow-xl w-[430px] p-8">
                {screen === "home" && (
                    <>
                        <h2 className="text-3xl font-bold text-center text-[#2E5E4E]">Bienvenido</h2>
                        <p className="text-gray-500 text-center mt-3">
                            Inicia sesión o crea una cuenta para acceder a SmartCity SPS.
                        </p>
                        <div className="flex flex-col gap-4 mt-8">
                            <button
                                onClick={() => setScreen("login")}
                                className="w-full py-3 rounded-lg bg-[#2E5E4E] text-white hover:bg-[#234839] transition"
                            >
                                Iniciar sesión
                            </button>
                            <button
                                onClick={() => setScreen("register")}
                                className="w-full py-3 rounded-lg border border-[#2E5E4E] text-[#2E5E4E] hover:bg-green-50 transition"
                            >
                                Registrarse
                            </button>
                        </div>
                        <button onClick={onClose} className="mt-8 w-full text-gray-500 hover:text-gray-700">
                            Cerrar
                        </button>
                    </>
                )}

                {screen === "login" && (
                    <>
                        <h2 className="text-3xl font-bold text-center text-[#2E5E4E]">Iniciar sesión</h2>
                        <p className="text-gray-500 text-center mt-3">Ingresa tus credenciales para continuar.</p>

                        <div className="mt-8 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Correo electrónico</label>
                                <input
                                    type="email"
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    placeholder="ejemplo@correo.com"
                                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2E5E4E]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Contraseña</label>
                                <input
                                    type="password"
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    placeholder="********"
                                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2E5E4E]"
                                />
                            </div>
                        </div>

                        {errorMsg && <p className="text-red-600 text-sm mt-3">{errorMsg}</p>}

                        <div className="flex justify-end gap-3 mt-8">
                            <button
                                onClick={() => {
                                    setScreen("home");
                                    setErrorMsg("");
                                }}
                                className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={manejarLogin}
                                disabled={cargando}
                                className="px-5 py-2 rounded-lg bg-[#2E5E4E] text-white hover:bg-[#234839] disabled:opacity-60"
                            >
                                {cargando ? "Verificando..." : "Login"}
                            </button>
                        </div>

                        <div className="text-center mt-8">
                            <p className="text-gray-500">¿No eres miembro aún?</p>
                            <button
                                onClick={() => {
                                    setScreen("register");
                                    setErrorMsg("");
                                }}
                                className="mt-2 text-[#2E5E4E] font-semibold hover:underline"
                            >
                                Regístrate
                            </button>
                        </div>
                    </>
                )}

                {screen === "register" && (
                    <>
                        <h2 className="text-3xl font-bold text-center text-[#2E5E4E]">Crear cuenta</h2>
                        <p className="text-gray-500 text-center mt-3">Completa la siguiente información.</p>

                        <div className="mt-8 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Nombre completo</label>
                                <input
                                    type="text"
                                    value={registerName}
                                    onChange={(e) => setRegisterName(e.target.value)}
                                    placeholder="Juan Pérez"
                                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2E5E4E]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Correo electrónico</label>
                                <input
                                    type="email"
                                    value={registerEmail}
                                    onChange={(e) => setRegisterEmail(e.target.value)}
                                    placeholder="correo@ejemplo.com"
                                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2E5E4E]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Contraseña</label>
                                <input
                                    type="password"
                                    value={registerPassword}
                                    onChange={(e) => setRegisterPassword(e.target.value)}
                                    placeholder="********"
                                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2E5E4E]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Colonia</label>
                                <select
                                    value={registerColoniaId}
                                    onChange={(e) => setRegisterColoniaId(e.target.value)}
                                    disabled={loadingColonias}
                                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2E5E4E]"
                                >
                                    <option value="">Selecciona tu colonia...</option>
                                    {colonias.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {errorMsg && <p className="text-red-600 text-sm mt-3">{errorMsg}</p>}

                        <div className="flex justify-end gap-3 mt-8">
                            <button
                                onClick={() => {
                                    setScreen("home");
                                    setErrorMsg("");
                                }}
                                className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={manejarRegistro}
                                disabled={cargando}
                                className="px-5 py-2 rounded-lg bg-[#2E5E4E] text-white hover:bg-[#234839] disabled:opacity-60"
                            >
                                {cargando ? "Creando..." : "Registrar"}
                            </button>
                        </div>
                    </>
                )}

                {screen === "profile" && !usuario && (
                    <div className="py-16 text-center">
                        {cargandoSesion ? (
                            <p className="text-gray-500">Cargando tu perfil...</p>
                        ) : (
                            <>
                                <p className="text-gray-600 mb-4">
                                    No pudimos cargar tu perfil. Puede que la cuenta exista en Auth pero
                                    falte el registro en la base de datos.
                                </p>
                                <button
                                    onClick={() => {
                                        setScreen("home");
                                        setErrorMsg("");
                                    }}
                                    className="px-5 py-2 rounded-lg bg-[#2E5E4E] text-white hover:bg-[#234839]"
                                >
                                    Volver
                                </button>
                            </>
                        )}
                    </div>
                )}

                {screen === "profile" && usuario && (
                    <>
                        <div className="flex flex-col items-center">
                            <button
                                onClick={onClose}
                                className="absolute top-5 right-5 w-8 h-8 rounded-full hover:bg-gray-100 transition flex items-center justify-center"
                                title="Cerrar"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 text-gray-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="w-20 h-20 rounded-full bg-[#D4E0D9] flex items-center justify-center mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-10 h-10 text-[#2E5E4E]"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-4.418 0-8 1.79-8 4v1h16v-1c0-2.21-3.582-4-8-4z"
                                    />
                                </svg>
                            </div>

                            <h2 className="text-2xl font-bold text-[#2E5E4E]">¡Hola {usuario.nombre}! 👋</h2>
                            <p className="text-gray-500 mt-1">{usuario.email}</p>
                        </div>

                        <div className="mt-8 space-y-4">
                            <div className="flex justify-between border-b pb-3">
                                <span className="font-medium text-gray-600">Colonia</span>
                                <span className="text-[#2E5E4E] font-semibold">
                                    {usuario.coloniaNombre ?? "Sin especificar"}
                                </span>
                            </div>
                            <div className="flex justify-between border-b pb-3">
                                <span className="font-medium text-gray-600">Miembro desde</span>
                                <span className="text-[#2E5E4E] font-semibold">
                                    {(() => {
                                        const fecha = new Date(usuario.createdAt);
                                        return isNaN(fecha.getTime())
                                            ? "Fecha no disponible"
                                            : fecha.toLocaleDateString("es-HN", {
                                                day: "2-digit",
                                                month: "long",
                                                year: "numeric",
                                            });
                                    })()}
                                </span>
                            </div>
                        </div>

                        <div className="mt-8 space-y-3">
                            <button
                                onClick={manejarCerrarSesion}
                                className="w-full text-left px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition"
                            >
                                🚪 Cerrar sesión
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}