import { useState } from "react";

type TipoCuenta = "ciudadano" | "operador";

// Puntos del "mapa en vivo" del panel lateral — puramente decorativo,
// evoca las mismas rutas de recolección que ve el usuario ya logueado.
const puntosMapa = [
  { x: 22, y: 28, activo: true },
  { x: 48, y: 18, activo: false },
  { x: 68, y: 32, activo: true },
  { x: 30, y: 52, activo: false },
  { x: 58, y: 58, activo: true },
  { x: 80, y: 50, activo: false },
  { x: 20, y: 74, activo: false },
  { x: 46, y: 80, activo: true },
  { x: 72, y: 76, activo: false },
];

const rutasSvg = [
  "M 22 28 L 48 18 L 68 32",
  "M 30 52 L 58 58 L 80 50",
  "M 20 74 L 46 80 L 72 76",
  "M 48 18 L 58 58",
];

export default function Login({
  onLogin,
  onIrARegistro,
}: {
  onLogin?: (tipo: TipoCuenta) => void;
  onIrARegistro?: () => void;
} = {}) {
  const [tipo, setTipo] = useState<TipoCuenta>("ciudadano");
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [verClave, setVerClave] = useState(false);
  const [recordarme, setRecordarme] = useState(true);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const validarCorreo = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!correo || !clave) {
      setError("Completa tu correo y contraseña para continuar.");
      return;
    }
    if (!validarCorreo(correo)) {
      setError("Ingresa un correo electrónico válido.");
      return;
    }
    setError("");
    setCargando(true);
    setTimeout(() => {
      setCargando(false);
      onLogin?.(tipo);
    }, 900);
  };

  return (
    <div
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="min-h-screen bg-white flex"
    >
      {/* Columna del formulario */}
      <div className="w-full lg:w-[46%] flex flex-col justify-between px-6 sm:px-12 py-8">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-[#16643A] rounded-sm flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 2L14 5v6l-6 3L2 11V5l6-3z"
                fill="white"
                opacity="0.9"
              />
              <path
                d="M8 2v12M2 5l6 3 6-3"
                stroke="white"
                strokeWidth="0.8"
                opacity="0.5"
              />
            </svg>
          </div>
          <span
            style={{ fontFamily: "'Outfit', sans-serif" }}
            className="font-700 text-[#111A14] text-md tracking-tight"
          >
            CleanCity <span className="text-[#16643A]">SPS</span>
          </span>
        </div>

        {/* Formulario */}
        <div className="w-full max-w-[380px] mx-auto lg:mx-0 my-auto py-10">
          <p className="text-xs font-semibold tracking-widest text-[#5A6B5E] uppercase mb-1.5">
            Bienvenido de nuevo
          </p>
          <h1
            style={{ fontFamily: "'Outfit', sans-serif" }}
            className="text-3xl font-800 text-[#111A14] leading-tight mb-1"
          >
            Inicia sesión
          </h1>
          <p className="text-sm text-[#5A6B5E] mb-6">
            Consulta tu ruta de recolección, envía reportes y da seguimiento en
            tiempo real.
          </p>

          {/* Selector de tipo de cuenta */}
          <div className="grid grid-cols-2 gap-2 mb-5">
            {[
              { id: "ciudadano" as const, label: "Ciudadano", icono: "🏠" },
              { id: "operador" as const, label: "Operador", icono: "🚛" },
            ].map((op) => (
              <button
                key={op.id}
                type="button"
                onClick={() => setTipo(op.id)}
                className={`flex items-center gap-2 justify-center rounded-lg border-2 py-2.5 text-sm font-semibold transition-all ${
                  tipo === op.id
                    ? "border-[#16643A] bg-[#E8F2EC] text-[#16643A]"
                    : "border-[#D4E0D9] text-[#5A6B5E] hover:border-[#B8D9C5]"
                }`}
              >
                <span className="text-md">{op.icono}</span>
                {op.label}
              </button>
            ))}
          </div>

          <form onSubmit={enviar} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold tracking-wider text-[#5A6B5E] uppercase mb-1.5">
                Correo electrónico
              </label>
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="tunombre@correo.com"
                className="w-full border border-[#D4E0D9] rounded-md px-3 py-2.5 text-sm text-[#111A14] bg-white focus:outline-none focus:ring-2 focus:ring-[#16643A] placeholder:text-[#B0BDB5]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold tracking-wider text-[#5A6B5E] uppercase">
                  Contraseña
                </label>
                <button
                  type="button"
                  className="text-xs text-[#16643A] font-semibold hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <div className="relative">
                <input
                  type={verClave ? "text" : "password"}
                  value={clave}
                  onChange={(e) => setClave(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-[#D4E0D9] rounded-md px-3 py-2.5 pr-10 text-sm text-[#111A14] bg-white focus:outline-none focus:ring-2 focus:ring-[#16643A] placeholder:text-[#B0BDB5]"
                />
                <button
                  type="button"
                  onClick={() => setVerClave(!verClave)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#5A6B5E] hover:text-[#111A14] font-medium"
                >
                  {verClave ? "Ocultar" : "Ver"}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-sm text-[#DC2626] bg-[#FEF2F2] border border-[#FCA5A5] rounded-md px-3 py-2">
                {error}
              </div>
            )}

            <label className="flex items-center gap-2 text-sm text-[#5A6B5E] pt-1">
              <input
                type="checkbox"
                checked={recordarme}
                onChange={(e) => setRecordarme(e.target.checked)}
                className="w-3.5 h-3.5 rounded border-[#D4E0D9] text-[#16643A] focus:ring-[#16643A]"
              />
              Mantener sesión iniciada
            </label>

            <button
              type="submit"
              disabled={cargando}
              className="w-full bg-[#16643A] text-white py-2.5 rounded-md text-sm font-semibold hover:bg-[#1A7A46] transition-colors disabled:opacity-60 flex items-center justify-center gap-2 mt-1"
            >
              {cargando ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Verificando…
                </>
              ) : (
                "Iniciar sesión"
              )}
            </button>
          </form>

          <p className="text-sm text-[#5A6B5E] text-center mt-6">
            ¿Aún no tienes cuenta?{" "}
            <button
              onClick={onIrARegistro}
              className="text-[#16643A] font-semibold hover:underline"
            >
              Regístrate aquí
            </button>
          </p>
        </div>

        <div
          className="text-xs text-[#5A6B5E]"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          CleanCity SPS · San Pedro Sula, Honduras · Hackathon 2026
        </div>
      </div>

      {/* Columna decorativa — mapa en vivo */}
      <div className="hidden lg:flex flex-1 relative bg-[#0F3D24] overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="grid"
              width="8"
              height="8"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 8 0 L 0 0 0 8"
                fill="none"
                stroke="#1F5E3E"
                strokeWidth="0.15"
              />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
          {rutasSvg.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="none"
              stroke="#3A8F62"
              strokeWidth="0.4"
              strokeDasharray="1.2 1.2"
              opacity="0.8"
            />
          ))}
          {puntosMapa.map((p, i) => (
            <g key={i}>
              {p.activo && (
                <circle cx={p.x} cy={p.y} r="2.2" fill="#E8920A" opacity="0.25">
                  <animate
                    attributeName="r"
                    values="2.2;4.5;2.2"
                    dur="2.4s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.35;0;0.35"
                    dur="2.4s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
              <circle
                cx={p.x}
                cy={p.y}
                r="1.1"
                fill={p.activo ? "#E8920A" : "#3A8F62"}
              />
            </g>
          ))}
        </svg>

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div className="flex items-center gap-1.5 text-xs text-[#B8D9C5]">
            <span className="w-1.5 h-1.5 bg-[#E8920A] rounded-full animate-pulse" />
            <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              3 CAMIONES EN RUTA · SPS
            </span>
          </div>

          <div className="max-w-[360px]">
            <h2
              style={{ fontFamily: "'Outfit', sans-serif" }}
              className="text-[28px] font-800 text-white leading-tight mb-3"
            >
              Tu ciudad,
              <br />
              más limpia cada día.
            </h2>
            <p className="text-sm text-[#B8D9C5] leading-relaxed">
              Sigue la recolección en tu colonia, reporta incidencias y ayuda a
              cerrar las brechas de cobertura en San Pedro Sula.
            </p>
          </div>

          <div className="flex gap-6">
            {[
              { valor: "15", label: "Colonias monitoreadas" },
              { valor: "8", label: "Camiones activos" },
              { valor: "98%", label: "Reportes atendidos" },
            ].map((s) => (
              <div key={s.label}>
                <div
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                  className="text-[22px] font-800 text-white leading-none"
                >
                  {s.valor}
                </div>
                <div className="text-xs text-[#8FB39E] mt-1 max-w-[80px] leading-tight">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
