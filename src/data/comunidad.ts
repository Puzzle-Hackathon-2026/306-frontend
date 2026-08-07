// --- Cobertura equitativa (antes "Módulo B") ---------------------------

export interface ColoniaCobertura {
  nombre: string;
  frecuencia: number;
  ultimaVisita: string;
  dias: number;
  reportes: number;
  poblacion: number;
  indice: number;
}

export const coloniasCobertura: ColoniaCobertura[] = [
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

export const DIAS_UMBRAL_DESATENCION = 5;

// --- Reciclaje y segregación (antes "Módulo C") -------------------------

export interface TipoResiduo {
  tipo: string;
  color: string;
  bg: string;
  icono: string;
  ejemplos: string[];
  contenedor: string;
  nota: string;
}

export const guiaSeparacion: TipoResiduo[] = [
  {
    tipo: "Orgánico",
    color: "#16643A",
    bg: "#E8F2EC",
    icono: "🥦",
    ejemplos: [
      "Restos de comida",
      "Cáscaras de fruta",
      "Posos de café",
      "Hojas y pasto",
      "Restos de jardín",
    ],
    contenedor: "Verde",
    nota: "Se convierte en compost. No incluir carnes ni aceites.",
  },
  {
    tipo: "Plástico",
    color: "#2563EB",
    bg: "#EFF6FF",
    icono: "♻️",
    ejemplos: [
      "Botellas PET",
      "Envases de yogurt",
      "Bolsas plásticas",
      "Tapas y tapones",
      "Empaques de alimentos",
    ],
    contenedor: "Azul",
    nota: "Enjuagar antes de depositar. Aplastar para reducir volumen.",
  },
  {
    tipo: "Vidrio",
    color: "#7C3AED",
    bg: "#F5F3FF",
    icono: "🫙",
    ejemplos: [
      "Botellas de vidrio",
      "Frascos de mermelada",
      "Envases de salsas",
      "Botellas de bebidas",
    ],
    contenedor: "Morado",
    nota: "No incluir espejos ni vidrio de ventanas. Manejo con cuidado.",
  },
  {
    tipo: "Cartón y papel",
    color: "#92400E",
    bg: "#FEF3C7",
    icono: "📦",
    ejemplos: [
      "Cajas de cartón",
      "Periódicos",
      "Revistas",
      "Papel de oficina",
      "Cajas de cereal",
    ],
    contenedor: "Amarillo",
    nota: "Mantener seco y libre de grasas. Doblar cajas para ahorrar espacio.",
  },
  {
    tipo: "Peligroso",
    color: "#DC2626",
    bg: "#FEF2F2",
    icono: "⚠️",
    ejemplos: [
      "Pilas y baterías",
      "Medicamentos vencidos",
      "Aceite de cocina",
      "Pinturas",
      "Insecticidas",
    ],
    contenedor: "Rojo",
    nota: "NUNCA mezclar con basura común. Llevar a punto de acopio especial.",
  },
];

export interface PuntoAcopio {
  nombre: string;
  zona: string;
  materiales: string[];
  horario: string;
  distancia: string;
  activo: boolean;
}

export const puntosAcopio: PuntoAcopio[] = [
  {
    nombre: "Centro de Reciclaje San Pedro",
    zona: "Barrio El Centro",
    materiales: ["Plástico", "Vidrio", "Cartón"],
    horario: "L-V 7:00–17:00",
    distancia: "1.2 km",
    activo: true,
  },
  {
    nombre: "EcoPoint Guamilito",
    zona: "Barrio Guamilito",
    materiales: ["Plástico", "Vidrio"],
    horario: "L-S 8:00–16:00",
    distancia: "2.4 km",
    activo: true,
  },
  {
    nombre: "Punto Verde Las Palmas",
    zona: "Col. Las Palmas",
    materiales: ["Orgánico", "Cartón"],
    horario: "L-V 6:30–15:00",
    distancia: "3.1 km",
    activo: true,
  },
  {
    nombre: "Acopio Reciclado Miraflores",
    zona: "Col. Miraflores",
    materiales: ["Plástico", "Vidrio", "Peligroso"],
    horario: "Mar-Jue 9:00–14:00",
    distancia: "4.7 km",
    activo: false,
  },
  {
    nombre: "Centro Ambiental Los Andes",
    zona: "Col. Los Andes",
    materiales: ["Plástico", "Cartón", "Vidrio", "Peligroso"],
    horario: "L-V 7:00–18:00",
    distancia: "5.8 km",
    activo: true,
  },
];

export const calendarioDiferenciado = [
  { dia: "Lun", general: true, reciclaje: false, organico: false },
  { dia: "Mar", general: false, reciclaje: true, organico: false },
  { dia: "Mié", general: true, reciclaje: false, organico: true },
  { dia: "Jue", general: false, reciclaje: true, organico: false },
  { dia: "Vie", general: true, reciclaje: false, organico: true },
  { dia: "Sáb", general: false, reciclaje: true, organico: false },
];

export interface Logro {
  id: number;
  titulo: string;
  descripcion: string;
  puntos: number;
  desbloqueado: boolean;
  icono: string;
}

export const logros: Logro[] = [
  {
    id: 1,
    titulo: "Primer reporte",
    descripcion: "Enviaste tu primer reporte ciudadano",
    puntos: 10,
    desbloqueado: true,
    icono: "📣",
  },
  {
    id: 2,
    titulo: "Vecino activo",
    descripcion: "5 reportes enviados este mes",
    puntos: 30,
    desbloqueado: true,
    icono: "🏘️",
  },
  {
    id: 3,
    titulo: "Reciclador novato",
    descripcion: "Visitaste un punto de acopio",
    puntos: 20,
    desbloqueado: true,
    icono: "♻️",
  },
  {
    id: 4,
    titulo: "Guardián verde",
    descripcion: "10 reportes de punto ilegal resueltos",
    puntos: 80,
    desbloqueado: false,
    icono: "🌿",
  },
  {
    id: 5,
    titulo: "Líder de colonia",
    descripcion: "Top 3 en reportes de tu zona",
    puntos: 150,
    desbloqueado: false,
    icono: "🏆",
  },
  {
    id: 6,
    titulo: "Campeón ambiental",
    descripcion: "50 visitas a puntos de acopio",
    puntos: 300,
    desbloqueado: false,
    icono: "🌍",
  },
];

export const PUNTOS_USUARIO = 60;
export const PROXIMO_LOGRO_META = 80;
