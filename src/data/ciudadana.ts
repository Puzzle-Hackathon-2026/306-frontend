export const colonias = [
  "Col. Trejo",
  "Col. Las Palmas",
  "Col. Los Andes",
  "Barrio El Centro",
  "Barrio Cabañas",
  "Col. Miraflores",
  "Col. El Prado",
  "Col. Villa del Sol",
  "Barrio Guamilito",
  "Col. Moderna",
  "Col. Universitaria",
  "Col. La Hacienda",
  "Barrio Suyapa",
  "Col. Alameda",
  "Col. Jardines del Valle",
];

export type EstadoRecoleccion =
  | "pasó"
  | "en camino"
  | "pendiente"
  | "no pasa hoy";

export interface HorarioColonia {
  dias: string[];
  hora: string;
  estado: EstadoRecoleccion;
}

export const horarios: Record<string, HorarioColonia> = {
  "Col. Trejo": {
    dias: ["Lunes", "Miércoles", "Viernes"],
    hora: "07:30",
    estado: "pasó",
  },
  "Col. Las Palmas": {
    dias: ["Martes", "Jueves"],
    hora: "08:00",
    estado: "en camino",
  },
  "Col. Los Andes": {
    dias: ["Lunes", "Miércoles", "Viernes"],
    hora: "09:15",
    estado: "pendiente",
  },
  "Barrio El Centro": {
    dias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
    hora: "06:30",
    estado: "pasó",
  },
  "Barrio Cabañas": {
    dias: ["Martes", "Jueves", "Sábado"],
    hora: "10:00",
    estado: "en camino",
  },
  "Col. Miraflores": {
    dias: ["Lunes", "Miércoles"],
    hora: "11:00",
    estado: "no pasa hoy",
  },
  "Col. El Prado": {
    dias: ["Martes", "Viernes"],
    hora: "08:45",
    estado: "no pasa hoy",
  },
  "Col. Villa del Sol": {
    dias: ["Lunes", "Miércoles", "Viernes"],
    hora: "07:00",
    estado: "pasó",
  },
  "Barrio Guamilito": {
    dias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
    hora: "06:00",
    estado: "pasó",
  },
  "Col. Moderna": {
    dias: ["Martes", "Jueves"],
    hora: "09:30",
    estado: "pendiente",
  },
  "Col. Universitaria": {
    dias: ["Lunes", "Miércoles", "Viernes"],
    hora: "10:30",
    estado: "pendiente",
  },
  "Col. La Hacienda": {
    dias: ["Martes", "Viernes"],
    hora: "11:15",
    estado: "no pasa hoy",
  },
  "Barrio Suyapa": {
    dias: ["Lunes", "Jueves"],
    hora: "08:30",
    estado: "en camino",
  },
  "Col. Alameda": {
    dias: ["Miércoles", "Sábado"],
    hora: "09:00",
    estado: "no pasa hoy",
  },
  "Col. Jardines del Valle": {
    dias: ["Martes", "Jueves"],
    hora: "07:45",
    estado: "pendiente",
  },
};

export const diasSemana = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export const notificaciones = [
  {
    id: 1,
    tipo: "info",
    msg: "El camión de Col. Las Palmas está a 3 paradas de tu zona.",
    tiempo: "hace 8 min",
  },
  {
    id: 2,
    tipo: "success",
    msg: "Tu reporte #0041 fue atendido y cerrado exitosamente.",
    tiempo: "hace 2 h",
  },
  {
    id: 3,
    tipo: "warning",
    msg: "Ruta de Col. Miraflores cancelada hoy por mantenimiento.",
    tiempo: "hace 3 h",
  },
] as const;

export const tiposProblema = [
  "Basura acumulada",
  "Camión no pasó en fecha programada",
  "Punto ilegal de disposición",
  "Desbordamiento de contenedor",
  "Otro",
];
