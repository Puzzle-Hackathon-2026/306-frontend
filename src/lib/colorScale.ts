/**
 * Escala de color compartida para representar el "índice de cobertura"
 * (0-100) en Módulo B / Comunidad. Un solo lugar para tocar la paleta.
 */
export function getColorByIndice(indice: number): string {
  if (indice >= 75) return '#16643A' // verde primario
  if (indice >= 50) return '#5BA875' // verde claro
  if (indice >= 30) return '#E8920A' // amarillo/ámbar
  if (indice >= 15) return '#DC7626' // naranja
  return '#DC2626' // rojo
}

export function getBgByIndice(indice: number): string {
  if (indice >= 75) return '#E8F2EC'
  if (indice >= 50) return '#F0F7F2'
  if (indice >= 30) return '#FEF3E2'
  if (indice >= 15) return '#FEF0E6'
  return '#FEF2F2'
}
