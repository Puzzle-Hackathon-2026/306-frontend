export function formatRelativeTime(isoDate: string): string {
  const fecha = new Date(isoDate);
  const ahora = new Date();
  const diffMs = ahora.getTime() - fecha.getTime();
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return "justo ahora";
  if (diffMin < 60) return `hace ${diffMin} min`;

  const diffHoras = Math.floor(diffMin / 60);
  if (diffHoras < 24) return `hace ${diffHoras} h`;

  const diffDias = Math.floor(diffHoras / 24);
  if (diffDias === 1) return "hace 1 día";
  return `hace ${diffDias} días`;
}
