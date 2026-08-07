import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const colonias = [
  {
    nombre: "Barrio El Centro",
    frecuencia: 5,
    ultimaVisita: "hoy",
    dias: 0,
    reportes: 2,
    poblacion: 12400,
    indice: 98,
  },
  {
    nombre: "Barrio Guamilito",
    frecuencia: 5,
    ultimaVisita: "hoy",
    dias: 0,
    reportes: 4,
    poblacion: 9800,
    indice: 95,
  },
  {
    nombre: "Col. Trejo",
    frecuencia: 3,
    ultimaVisita: "hoy",
    dias: 0,
    reportes: 1,
    poblacion: 7200,
    indice: 88,
  },
  {
    nombre: "Col. Villa del Sol",
    frecuencia: 3,
    ultimaVisita: "hoy",
    dias: 0,
    reportes: 0,
    poblacion: 5600,
    indice: 85,
  },
  {
    nombre: "Col. Las Palmas",
    frecuencia: 2,
    ultimaVisita: "ayer",
    dias: 1,
    reportes: 2,
    poblacion: 6100,
    indice: 71,
  },
  {
    nombre: "Barrio Suyapa",
    frecuencia: 2,
    ultimaVisita: "ayer",
    dias: 1,
    reportes: 3,
    poblacion: 8900,
    indice: 68,
  },
  {
    nombre: "Barrio Cabañas",
    frecuencia: 3,
    ultimaVisita: "2 días",
    dias: 2,
    reportes: 5,
    poblacion: 11200,
    indice: 72,
  },
  {
    nombre: "Col. Los Andes",
    frecuencia: 3,
    ultimaVisita: "hoy",
    dias: 0,
    reportes: 0,
    poblacion: 4300,
    indice: 80,
  },
  {
    nombre: "Col. Jardines del Valle",
    frecuencia: 2,
    ultimaVisita: "3 días",
    dias: 3,
    reportes: 6,
    poblacion: 7800,
    indice: 54,
  },
  {
    nombre: "Col. Moderna",
    frecuencia: 2,
    ultimaVisita: "4 días",
    dias: 4,
    reportes: 8,
    poblacion: 6400,
    indice: 41,
  },
  {
    nombre: "Col. Universitaria",
    frecuencia: 3,
    ultimaVisita: "4 días",
    dias: 4,
    reportes: 7,
    poblacion: 15000,
    indice: 38,
  },
  {
    nombre: "Col. La Hacienda",
    frecuencia: 2,
    ultimaVisita: "6 días",
    dias: 6,
    reportes: 11,
    poblacion: 5200,
    indice: 22,
  },
  {
    nombre: "Col. Alameda",
    frecuencia: 1,
    ultimaVisita: "7 días",
    dias: 7,
    reportes: 9,
    poblacion: 4800,
    indice: 18,
  },
  {
    nombre: "Col. El Prado",
    frecuencia: 2,
    ultimaVisita: "8 días",
    dias: 8,
    reportes: 14,
    poblacion: 6700,
    indice: 12,
  },
  {
    nombre: "Col. Miraflores",
    frecuencia: 2,
    ultimaVisita: "10 días",
    dias: 10,
    reportes: 17,
    poblacion: 8300,
    indice: 8,
  },
];

const diasUmbral = 5;

function getColor(indice: number) {
  if (indice >= 75) return "#16643A";
  if (indice >= 50) return "#5BA875";
  if (indice >= 30) return "#E8920A";
  if (indice >= 15) return "#DC7626";
  return "#DC2626";
}

function getBg(indice: number) {
  if (indice >= 75) return "#E8F2EC";
  if (indice >= 50) return "#F0F7F2";
  if (indice >= 30) return "#FEF3E2";
  if (indice >= 15) return "#FEF0E6";
  return "#FEF2F2";
}

const desatendidas = colonias.filter((c) => c.dias >= diasUmbral);

const recomendaciones = [...colonias]
  .sort((a, b) => {
    const scoreA = (100 - a.indice) * 0.6 + a.reportes * 0.4;
    const scoreB = (100 - b.indice) * 0.6 + b.reportes * 0.4;
    return scoreB - scoreA;
  })
  .slice(0, 5);

export default function ModuloB() {
  const [ordenado, setOrdenado] = useState<"indice" | "dias" | "reportes">(
    "indice",
  );

  const datos = [...colonias].sort((a, b) => {
    if (ordenado === "indice") return a.indice - b.indice;
    if (ordenado === "dias") return b.dias - a.dias;
    return b.reportes - a.reportes;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-xs font-semibold tracking-widest text-[#5A6B5E] uppercase mb-1">
          Módulo B · Social
        </p>
        <h1
          style={{ fontFamily: "'Outfit', sans-serif" }}
          className="text-3xl font-800 text-[#111A14] leading-none"
        >
          Cobertura equitativa
        </h1>
        <p className="text-sm text-[#5A6B5E] mt-1">
          Análisis de brechas por colonia y priorización de zonas desatendidas
        </p>
      </div>

      {/* KPIs brecha */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          {
            label: "Colonias desatendidas",
            value: `${desatendidas.length}`,
            sub: `Más de ${diasUmbral} días sin servicio`,
            color: "#DC2626",
          },
          {
            label: "Índice promedio",
            value: "55",
            sub: "De 100 en toda la ciudad",
            color: "#E8920A",
          },
          {
            label: "Zona más crítica",
            value: "Col. Miraflores",
            sub: "10 días sin recolección",
            color: "#7C3AED",
            small: true,
          },
          {
            label: "Reportes en brechas",
            value: `${desatendidas.reduce((a, c) => a + c.reportes, 0)}`,
            sub: "En colonias críticas hoy",
            color: "#DC2626",
          },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className="border border-[#D4E0D9] rounded-xl p-4"
          >
            <div className="text-xs font-semibold tracking-wider text-[#5A6B5E] uppercase mb-2">
              {kpi.label}
            </div>
            <div
              style={{
                fontFamily: "'Outfit', sans-serif",
                color: kpi.color,
                fontSize: kpi.small ? 16 : 30,
              }}
              className="font-800 leading-tight"
            >
              {kpi.value}
            </div>
            <div className="text-xs text-[#5A6B5E] mt-1.5">{kpi.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mapa de brechas */}
        <div className="border border-[#D4E0D9] rounded-xl p-5">
          <h2
            style={{ fontFamily: "'Outfit', sans-serif" }}
            className="text-md font-700 text-[#111A14] mb-1"
          >
            Mapa de brechas
          </h2>
          <p className="text-xs text-[#5A6B5E] mb-4">
            Índice de cobertura por zona — menor es peor
          </p>
          <div className="grid grid-cols-3 gap-1.5">
            {[...colonias]
              .sort((a, b) => b.indice - a.indice)
              .map((c) => (
                <div
                  key={c.nombre}
                  className="rounded-md p-2 text-center border"
                  style={{
                    backgroundColor: getBg(c.indice),
                    borderColor: getColor(c.indice) + "44",
                  }}
                >
                  <div className="text-2xs font-semibold text-[#5A6B5E] leading-tight mb-1">
                    {c.nombre.replace("Barrio ", "B. ").replace("Col. ", "")}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      color: getColor(c.indice),
                    }}
                    className="text-lg font-800 leading-none"
                  >
                    {c.indice}
                  </div>
                  <div className="text-2xs text-[#5A6B5E] mt-0.5">/{100}</div>
                </div>
              ))}
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-[#5A6B5E]">
            <div className="flex items-center gap-2">
              {[
                { color: "#16643A", label: "75+" },
                { color: "#E8920A", label: "30–50" },
                { color: "#DC2626", label: "<15" },
              ].map((l) => (
                <span key={l.label} className="flex items-center gap-1">
                  <span
                    className="w-2.5 h-2.5 rounded-sm"
                    style={{ backgroundColor: l.color }}
                  />
                  {l.label}
                </span>
              ))}
            </div>
            <span>Índice de cobertura</span>
          </div>
        </div>

        {/* Alertas de zona desatendida */}
        <div className="border border-[#D4E0D9] rounded-xl p-5">
          <h2
            style={{ fontFamily: "'Outfit', sans-serif" }}
            className="text-md font-700 text-[#111A14] mb-1"
          >
            Alertas — zonas desatendidas
          </h2>
          <p className="text-xs text-[#5A6B5E] mb-4">
            Colonias con más de {diasUmbral} días sin recolección
          </p>
          <div className="space-y-2">
            {desatendidas
              .sort((a, b) => b.dias - a.dias)
              .map((c) => (
                <div
                  key={c.nombre}
                  className="flex items-center gap-3 rounded-lg p-3 border"
                  style={{
                    backgroundColor: getBg(c.indice),
                    borderColor: getColor(c.indice) + "44",
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-md flex items-center justify-center font-800 text-sm flex-shrink-0"
                    style={{
                      backgroundColor: getColor(c.indice),
                      color: "#fff",
                      fontFamily: "'Outfit', sans-serif",
                    }}
                  >
                    {c.dias}d
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-[#111A14] truncate">
                      {c.nombre}
                    </div>
                    <div className="text-xs text-[#5A6B5E]">
                      {c.poblacion.toLocaleString("es-HN")} hab · {c.reportes}{" "}
                      reportes activos
                    </div>
                  </div>
                  <div className="text-xs text-right flex-shrink-0">
                    <div
                      style={{ color: getColor(c.indice) }}
                      className="font-bold"
                    >
                      Índice {c.indice}
                    </div>
                    <div className="text-[#5A6B5E]">Últ: {c.ultimaVisita}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Índice por colonia — gráfico */}
      <div className="border border-[#D4E0D9] rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2
              style={{ fontFamily: "'Outfit', sans-serif" }}
              className="text-md font-700 text-[#111A14]"
            >
              Índice de cobertura por colonia
            </h2>
            <p className="text-xs text-[#5A6B5E]">
              Ordenado por índice de menor a mayor
            </p>
          </div>
          <div className="flex gap-1">
            {(["indice", "dias", "reportes"] as const).map((o) => (
              <button
                key={o}
                onClick={() => setOrdenado(o)}
                className={`text-xs px-2 py-1 rounded font-semibold capitalize transition-colors ${
                  ordenado === o
                    ? "bg-[#16643A] text-white"
                    : "bg-[#F0F4F1] text-[#5A6B5E] hover:bg-[#E8F2EC]"
                }`}
              >
                {o === "indice"
                  ? "Índice"
                  : o === "dias"
                    ? "Días sin servicio"
                    : "Reportes"}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart
            data={datos}
            layout="vertical"
            margin={{ left: 8, right: 16, top: 0, bottom: 0 }}
          >
            <XAxis
              type="number"
              domain={[0, 100]}
              tick={{ fontSize: 10, fill: "#5A6B5E" }}
            />
            <YAxis
              type="category"
              dataKey="nombre"
              width={140}
              tick={{ fontSize: 10, fill: "#5A6B5E" }}
              tickFormatter={(v: string) =>
                v.replace("Barrio ", "B. ").replace("Col. ", "")
              }
            />
            <Tooltip
              formatter={(val) => [`${val}`, "Índice"]}
              contentStyle={{
                fontSize: 11,
                borderColor: "#D4E0D9",
                borderRadius: 6,
              }}
            />
            <Bar dataKey="indice" radius={[0, 3, 3, 0]}>
              {datos.map((entry) => (
                <Cell key={entry.nombre} fill={getColor(entry.indice)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recomendaciones de priorización */}
      <div className="border border-[#D4E0D9] rounded-xl p-5">
        <h2
          style={{ fontFamily: "'Outfit', sans-serif" }}
          className="text-md font-700 text-[#111A14] mb-1"
        >
          Recomendación de priorización
        </h2>
        <p className="text-xs text-[#5A6B5E] mb-4">
          Colonias sugeridas para próximo despacho · criterio: tiempo sin
          servicio (60%) + incidencia de reportes (40%)
        </p>
        <div className="space-y-2">
          {recomendaciones.map((c, i) => (
            <div
              key={c.nombre}
              className="flex items-center gap-4 border border-[#D4E0D9] rounded-lg px-4 py-3 hover:bg-[#F8F9F8]"
            >
              <div
                className="w-7 h-7 rounded flex items-center justify-center font-800 text-sm flex-shrink-0"
                style={{
                  backgroundColor:
                    i === 0 ? "#DC2626" : i === 1 ? "#E8920A" : "#5A6B5E",
                  color: "#fff",
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                {i + 1}
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-[#111A14]">
                  {c.nombre}
                </div>
                <div className="text-xs text-[#5A6B5E]">
                  {c.dias} días sin recolección · {c.reportes} reportes ·{" "}
                  {c.poblacion.toLocaleString("es-HN")} habitantes
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div
                  className="text-xs font-semibold"
                  style={{ color: getColor(c.indice) }}
                >
                  Índice {c.indice}
                </div>
                <div className="text-xs text-[#5A6B5E]">Atender hoy</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
