import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

interface User {
  name: string;
  email: string;
  password: string;
  neighborhood: string;
  memberSince: string;
}

type Screen = "home" | "login" | "register" | "profile";

export default function AccountModal({ open, onClose }: Props) {
  const [screen, setScreen] = useState<Screen>("home");

  const [user, setUser] = useState<User | null>(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerNeighborhood, setRegisterNeighborhood] =
    useState("Colonia Trejo");

  const mockUser: User = {
    name: "Ana Rodríguez",
    email: "ana@smartcity.com",
    password: "123456",
    neighborhood: "Colonia Trejo",
    memberSince: "06 de agosto de 2026",
  };

  const neighborhoods = [
    "Colonia Trejo",
    "Barrio Río de Piedras",
    "Colonia Universidad",
    "Colonia Moderna",
  ];

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-2xl shadow-xl w-[430px] p-8">
        {/* =========================
            PANTALLA PRINCIPAL
        ========================== */}
        {screen === "home" && (
          <>
            <h2 className="text-3xl font-bold text-center text-[#2E5E4E]">
              Bienvenido
            </h2>

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

            <button
              onClick={onClose}
              className="mt-8 w-full text-gray-500 hover:text-gray-700"
            >
              Cerrar
            </button>
          </>
        )}
        {/* =========================
      LOGIN
========================= */}
        {screen === "login" && (
          <>
            <h2 className="text-3xl font-bold text-center text-[#2E5E4E]">
              Iniciar sesión
            </h2>

            <p className="text-gray-500 text-center mt-3">
              Ingresa tus credenciales para continuar.
            </p>

            <div className="mt-8 space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Correo electrónico
                </label>

                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="ejemplo@correo.com"
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2E5E4E]"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Contraseña
                </label>

                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="********"
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2E5E4E]"
                />
              </div>
            </div>

            {/* Botones */}

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setScreen("home")}
                className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Cancelar
              </button>

              <button
                onClick={() => {
                  if (
                    loginEmail === mockUser.email &&
                    loginPassword === mockUser.password
                  ) {
                    setUser(mockUser);
                    setScreen("profile");
                  } else {
                    alert("Correo o contraseña incorrectos.");
                  }
                }}
                className="px-5 py-2 rounded-lg bg-[#2E5E4E] text-white hover:bg-[#234839]"
              >
                Login
              </button>
            </div>

            {/* Registrarse */}

            <div className="text-center mt-8">
              <p className="text-gray-500">¿No eres miembro aún?</p>

              <button
                onClick={() => setScreen("register")}
                className="mt-2 text-[#2E5E4E] font-semibold hover:underline"
              >
                Regístrate
              </button>
            </div>
          </>
        )}
        {/* =========================
      REGISTRO
========================= */}
        {screen === "register" && (
          <>
            <h2 className="text-3xl font-bold text-center text-[#2E5E4E]">
              Crear cuenta
            </h2>

            <p className="text-gray-500 text-center mt-3">
              Completa la siguiente información.
            </p>

            <div className="mt-8 space-y-4">
              {/* Nombre */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Nombre completo
                </label>

                <input
                  type="text"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  placeholder="Juan Pérez"
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2E5E4E]"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Correo electrónico
                </label>

                <input
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  placeholder="correo@ejemplo.com"
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2E5E4E]"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Contraseña
                </label>

                <input
                  type="password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  placeholder="********"
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2E5E4E]"
                />
              </div>

              {/* Colonia */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Colonia
                </label>

                <select
                  value={registerNeighborhood}
                  onChange={(e) => setRegisterNeighborhood(e.target.value)}
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2E5E4E]"
                >
                  {neighborhoods.map((colonia) => (
                    <option key={colonia}>{colonia}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Botones */}

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setScreen("home")}
                className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Cancelar
              </button>

              <button
                onClick={() => {
                  if (
                    registerName === "" ||
                    registerEmail === "" ||
                    registerPassword === ""
                  ) {
                    alert("Completa todos los campos.");
                    return;
                  }

                  const newUser: User = {
                    name: registerName,
                    email: registerEmail,
                    password: registerPassword,
                    neighborhood: registerNeighborhood,
                    memberSince: new Date().toLocaleDateString("es-HN", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    }),
                  };

                  setUser(newUser);

                  setRegisterName("");
                  setRegisterEmail("");
                  setRegisterPassword("");
                  setRegisterNeighborhood("Colonia Trejo");

                  setScreen("profile");
                }}
                className="px-5 py-2 rounded-lg bg-[#2E5E4E] text-white hover:bg-[#234839]"
              >
                Registrar
              </button>
            </div>
          </>
        )}
        {/* =========================
      PERFIL
========================= */}
        {screen === "profile" && user && (
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              {/* Avatar */}
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

              <h2 className="text-2xl font-bold text-[#2E5E4E]">
                ¡Hola {user.name}! 👋
              </h2>

              <p className="text-gray-500 mt-1">{user.email}</p>
            </div>

            {/* Información */}

            <div className="mt-8 space-y-4">
              <div className="flex justify-between border-b pb-3">
                <span className="font-medium text-gray-600">Colonia</span>

                <span className="text-[#2E5E4E] font-semibold">
                  {user.neighborhood}
                </span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span className="font-medium text-gray-600">Miembro desde</span>

                <span className="text-[#2E5E4E] font-semibold">
                  {user.memberSince}
                </span>
              </div>
            </div>

            {/* Opciones */}

            <div className="mt-8 space-y-3">
              <button
                onClick={() => {
                  setUser(null);

                  setLoginEmail("");
                  setLoginPassword("");

                  setScreen("home");

                  onClose();
                }}
                className="w-full text-left px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition"
              >
                🚪 Cerrar sesión
              </button>
            </div>
          </>
        )}{" "}
      </div>
    </div>
  );
}
