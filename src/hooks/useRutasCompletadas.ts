import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";

export interface RutaCompletada {
    truckId: string;
    conductor: string | null;
    coloniaId: string | null;
    horaInicio: string | null;
    horaFin: string | null;
    duracionMinutos: number | null;
    distanciaKm: number | null;
    estado: string;
}

export function useRutasCompletadas() {
    const [rutas, setRutas] = useState<RutaCompletada[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelado = false;

        apiFetch<RutaCompletada[]>("/api/truckpositions/rutas-completadas")
            .then((data) => {
                if (!cancelado) setRutas(data);
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

    return { rutas, loading, error };
}