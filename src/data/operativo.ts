export type EstadoCamion = 'activo' | 'en pausa' | 'con incidente' | 'fuera de ruta'

export interface Camion {
  id: string
  conductor: string
  zona: string
  estado: EstadoCamion
  progreso: number
  inicio: string
  reportes: number
}

export const camiones: Camion[] = [
  { id: 'CAM-01', conductor: 'José Álvarez', zona: 'Barrio El Centro', estado: 'activo', progreso: 78, inicio: '06:00', reportes: 0 },
  { id: 'CAM-02', conductor: 'Mario Hernández', zona: 'Col. Las Palmas', estado: 'activo', progreso: 42, inicio: '07:30', reportes: 1 },
  { id: 'CAM-03', conductor: 'Roberto Cruz', zona: 'Col. Trejo', estado: 'activo', progreso: 91, inicio: '06:30', reportes: 0 },
  { id: 'CAM-04', conductor: 'Luis Aguilar', zona: 'Barrio Cabañas', estado: 'en pausa', progreso: 55, inicio: '08:00', reportes: 2 },
  { id: 'CAM-05', conductor: 'Carlos Flores', zona: 'Col. Villa del Sol', estado: 'activo', progreso: 30, inicio: '07:00', reportes: 0 },
  { id: 'CAM-06', conductor: 'Pedro Mejía', zona: 'Barrio Guamilito', estado: 'con incidente', progreso: 67, inicio: '06:00', reportes: 3 },
  { id: 'CAM-07', conductor: 'Ángel Torres', zona: 'Col. Los Andes', estado: 'activo', progreso: 20, inicio: '09:00', reportes: 0 },
  { id: 'CAM-08', conductor: 'Juan Medina', zona: 'Barrio Suyapa', estado: 'fuera de ruta', progreso: 0, inicio: '—', reportes: 1 },
]

export type EstadoReporte = 'pendiente' | 'en atención' | 'resuelto'
export type Urgencia = 'baja' | 'media' | 'alta'

export interface ReporteOperativo {
  id: string
  tipo: string
  zona: string
  hora: string
  estado: EstadoReporte
  urgencia: Urgencia
}

export const reportesOperativos: ReporteOperativo[] = [
  { id: '#0041', tipo: 'Basura acumulada', zona: 'Col. Miraflores', hora: '07:15', estado: 'resuelto', urgencia: 'baja' },
  { id: '#0042', tipo: 'Punto ilegal de disposición', zona: 'Barrio Guamilito', hora: '08:02', estado: 'en atención', urgencia: 'alta' },
  { id: '#0043', tipo: 'Camión no pasó', zona: 'Col. La Hacienda', hora: '08:45', estado: 'pendiente', urgencia: 'media' },
  { id: '#0044', tipo: 'Desbordamiento de contenedor', zona: 'Barrio Cabañas', hora: '09:10', estado: 'en atención', urgencia: 'alta' },
  { id: '#0045', tipo: 'Basura acumulada', zona: 'Col. Universitaria', hora: '09:33', estado: 'pendiente', urgencia: 'media' },
  { id: '#0046', tipo: 'Camión no pasó', zona: 'Col. Alameda', hora: '10:05', estado: 'pendiente', urgencia: 'baja' },
  { id: '#0047', tipo: 'Punto ilegal de disposición', zona: 'Col. Moderna', hora: '10:22', estado: 'pendiente', urgencia: 'alta' },
]

export const rutasCompletadas = [
  { fecha: '06 ago', hora: '13:45', camion: 'CAM-03', zona: 'Col. Trejo', distancia: '18.4 km', duracion: '4h 20min' },
  { fecha: '06 ago', hora: '12:30', camion: 'CAM-01', zona: 'Barrio El Centro', distancia: '12.1 km', duracion: '3h 10min' },
  { fecha: '05 ago', hora: '14:00', camion: 'CAM-02', zona: 'Col. Las Palmas', distancia: '15.7 km', duracion: '3h 45min' },
  { fecha: '05 ago', hora: '13:20', camion: 'CAM-05', zona: 'Col. Villa del Sol', distancia: '20.2 km', duracion: '5h 00min' },
  { fecha: '05 ago', hora: '11:00', camion: 'CAM-07', zona: 'Col. Los Andes', distancia: '9.8 km', duracion: '2h 30min' },
]

export type EstadoMapa = 'cubierta' | 'en progreso' | 'pendiente' | 'no programada'

export const coloniasMapaOperativo: { nombre: string; estado: EstadoMapa }[] = [
  { nombre: 'B. El Centro', estado: 'cubierta' },
  { nombre: 'Col. Trejo', estado: 'cubierta' },
  { nombre: 'B. Guamilito', estado: 'cubierta' },
  { nombre: 'Col. V. del Sol', estado: 'cubierta' },
  { nombre: 'Col. Las Palmas', estado: 'en progreso' },
  { nombre: 'B. Cabañas', estado: 'en progreso' },
  { nombre: 'B. Suyapa', estado: 'pendiente' },
  { nombre: 'Col. Los Andes', estado: 'en progreso' },
  { nombre: 'Col. Miraflores', estado: 'pendiente' },
  { nombre: 'Col. El Prado', estado: 'pendiente' },
  { nombre: 'Col. Universitaria', estado: 'pendiente' },
  { nombre: 'Col. Moderna', estado: 'pendiente' },
  { nombre: 'Col. La Hacienda', estado: 'pendiente' },
  { nombre: 'Col. Alameda', estado: 'no programada' },
  { nombre: 'Col. Jardines', estado: 'no programada' },
]
