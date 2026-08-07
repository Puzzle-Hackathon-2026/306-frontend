import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";

export interface PuntoAcopio {
  id: string;
  nombre: string;
  descripcion: string;
  lat: number;
  lng: number;
  materialesAceptados: string[];
  direccion: string;
  horario: string;
  coloniaId: string | null;
  activo: boolean;
}

export function usePuntosAcopio() {
  const [puntos, setPuntos] = useState<PuntoAcopio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelado = false;

    apiFetch<PuntoAcopio[]>("/api/puntosacopio")
      .then((data) => {
        if (!cancelado) setPuntos(data);
      })
      .catch((err) => {
        if (!cancelado)
          setError(err instanceof Error ? err.message : "Error desconocido");
      })
      .finally(() => {
        if (!cancelado) setLoading(false);
      });

    return () => {
      cancelado = true;
    };
  }, []);

  return { puntos, loading, error };
}
