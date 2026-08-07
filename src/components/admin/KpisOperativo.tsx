import { useTruckPositions } from "../../hooks/useTruckPositions";
import { useReportes } from "../../hooks/useReportes";
import { useCobertura } from "../../hooks/useCobertura";

type EstadoSemaforo = "verde" | "amarillo" | "rojo";

function estadoCobertura(valor: number): EstadoSemaforo {
  if (valor >= 80) return "verde";
  if (valor >= 60) return "amarillo";
  return "rojo";
}

function estadoCamiones(activos: number, total: number): EstadoSemaforo {
  const porcentaje = total === 0 ? 0 : (activos / total) * 100;

  if (porcentaje >= 95) return "verde";
  if (porcentaje >= 80) return "amarillo";
  return "rojo";
}

function estadoReportes(reportes: number): EstadoSemaforo {
  if (reportes <= 10) return "verde";
  if (reportes <= 20) return "amarillo";
  return "rojo";
}

function estadoZonasCriticas(zonas: number): EstadoSemaforo {
  if (zonas <= 5) return "verde";
  if (zonas <= 15) return "amarillo";
  return "rojo";
}

const estilos = {
  verde: {
    color: "#16A34A",
    fondo: "#ECFDF5",
    borde: "#BBF7D0",
    badge: "Óptimo",
  },
  amarillo: {
    color: "#F59E0B",
    fondo: "#FFFBEB",
    borde: "#FDE68A",
    badge: "Moderado",
  },
  rojo: {
    color: "#EF4444",
    fondo: "#FEF2F2",
    borde: "#FECACA",
    badge: "Crítico",
  },
};

const DIAS_UMBRAL_ZONA_CRITICA = 5;

export default function KpisOperativo() {
  const { camiones, loading: loadingCamiones } = useTruckPositions();
  const { reportes, loading: loadingReportes } = useReportes();
  const { colonias, loading: loadingColonias } = useCobertura();

  if (loadingCamiones || loadingReportes || loadingColonias) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="border border-[#D4E0D9] rounded-xl p-4 bg-white animate-pulse h-24"
          />
        ))}
      </div>
    );
  }

  const activos = camiones.filter((c) => c.estado === "activo").length;
  const conIncidente = camiones.filter((c) => c.estado === "incidente").length;
  const fueraDeRuta = camiones.filter(
    (c) => c.estado === "fuera_de_ruta",
  ).length;

  const reportesActivos = reportes.filter(
    (r) => r.estado === "pendiente" || r.estado === "en_proceso",
  );
  const reportesAltaUrgencia = reportesActivos.filter(
    (r) => r.urgencia === "alta",
  ).length;

  const cubiertasHoy = colonias.filter(
    (c) => c.diasSinRecoleccion === 0,
  ).length;
  const coberturaPct =
    colonias.length > 0
      ? Math.round((cubiertasHoy / colonias.length) * 100)
      : 0;

  const zonasCriticas = colonias.filter(
    (c) => c.diasSinRecoleccion > DIAS_UMBRAL_ZONA_CRITICA,
  ).length;

  const kpis = [
    {
      label: "Cobertura del día",
      value: `${coberturaPct}%`,
      sub: `${cubiertasHoy} de ${colonias.length} zonas`,
      estado: estadoCobertura(coberturaPct),
    },
    {
      label: "Camiones activos",
      value: `${activos}/${camiones.length}`,
      sub: `${conIncidente} con incidente · ${fueraDeRuta} fuera de ruta`,
      estado: estadoCamiones(activos, camiones.length),
    },
    {
      label: "Reportes activos",
      value: reportesActivos.length,
      sub: `${reportesAltaUrgencia} de alta urgencia hoy`,
      estado: estadoReportes(reportesActivos.length),
    },
    {
      label: "Residenciales sin servicio",
      value: zonasCriticas,
      sub: `Más de ${DIAS_UMBRAL_ZONA_CRITICA} días sin servicio`,
      estado: estadoZonasCriticas(zonasCriticas),
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {kpis.map((kpi) => {
        const estilo = estilos[kpi.estado];

        return (
          <div
            key={kpi.label}
            className="rounded-xl p-5"
            style={{
              background: estilo.fondo,
              border: `1px solid ${estilo.borde}`,
            }}
          >
            <p className="text-xs uppercase font-semibold text-gray-500">
              {kpi.label}
            </p>

            <h2
              className="text-4xl font-bold mt-2"
              style={{ color: estilo.color }}
            >
              {kpi.value}
            </h2>

            <p className="text-sm text-gray-500 mt-2">{kpi.sub}</p>

            <span
              className="inline-block mt-4 px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                background: estilo.color + "20",
                color: estilo.color,
              }}
            >
              {estilo.badge}
            </span>
          </div>
        );
      })}
    </div>
  );
}
