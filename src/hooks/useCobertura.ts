import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";

export interface ColoniaCobertura {
    coloniaId: string;
    nombre: string;
    indice: number;
    diasSinRecoleccion: number;
    poblacionEstimada: number | null;
    reportesActivos: number;
    ultimaVisita: string | null;
}

export function useCobertura() {
    const [colonias, setColonias] = useState<ColoniaCobertura[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelado = false;

        apiFetch<ColoniaCobertura[]>("/api/colonias/cobertura")
            .then((data) => {
                if (!cancelado) setColonias(data);
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

    return { colonias, loading, error };
}