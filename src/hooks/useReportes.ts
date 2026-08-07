import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "../lib/api";

export interface Reporte {
  id: string;
  categoria: string;
  descripcion: string;
  lat: number;
  lng: number;
  coloniaId: string | null;
  coloniaNombre: string | null;
  estado: "pendiente" | "en_proceso" | "resuelto";
  urgencia: "baja" | "media" | "alta" | null;
  fotoUrl: string | null;
  usuarioId: string;
  createdAt: string;
  updatedAt: string;
}

interface FiltrosReportes {
  estado?: string;
  usuarioId?: string;
  coloniaId?: string;
}

function construirQuery(filtros?: FiltrosReportes): string {
  if (!filtros) return "";
  const params = new URLSearchParams();
  if (filtros.estado) params.set("estado", filtros.estado);
  if (filtros.usuarioId) params.set("usuarioId", filtros.usuarioId);
  if (filtros.coloniaId) params.set("coloniaId", filtros.coloniaId);
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export function useReportes(filtros?: FiltrosReportes) {
  const [reportes, setReportes] = useState<Reporte[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargar = useCallback(() => {
    setLoading(true);
    setError(null);
    return apiFetch<Reporte[]>(`/api/reports${construirQuery(filtros)}`)
      .then((data) => setReportes(data))
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Error desconocido")
      )
      .finally(() => setLoading(false));
  }, [filtros?.estado, filtros?.usuarioId, filtros?.coloniaId]);

  useEffect(() => {
    let cancelado = false;
    cargar().catch(() => {
      if (cancelado) return;
    });
    return () => {
      cancelado = true;
    };
  }, [cargar]);

  return { reportes, loading, error, refetch: cargar };
}

// --- Mutaciones, se usan directo desde formularios/botones, no dependen de un hook activo ---

export interface CrearReporteInput {
  categoria: string;
  descripcion: string;
  lat: number;
  lng: number;
  coloniaId?: string | null;
  urgencia?: "baja" | "media" | "alta";
  fotoUrl?: string | null;
  usuarioId: string;
}

export async function crearReporte(input: CrearReporteInput): Promise<Reporte> {
  return apiFetch<Reporte>("/api/reports", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function actualizarEstadoReporte(
  id: string,
  estado: "pendiente" | "en_proceso" | "resuelto"
): Promise<Reporte> {
  return apiFetch<Reporte>(`/api/reports/${id}`, {
    method: "PUT",
    body: JSON.stringify({ estado }),
  });
}