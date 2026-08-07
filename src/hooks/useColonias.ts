import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";

export interface Colonia {
    id: string;
    nombre: string;
    diaRecoleccion: string;
    diasRecoleccionIso: number[];
    horaInicioRecoleccion: string | null;
    horaFinRecoleccion: string | null;
    lat: number;
    lng: number;
}

export function useColonias() {
    const [colonias, setColonias] = useState<Colonia[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelado = false;
        apiFetch<Colonia[]>("/api/colonias")
            .then((data) => {
                if (!cancelado) setColonias(data);
            })
            .catch((err) => {
                if (!cancelado) setError(err instanceof Error ? err.message : "Error desconocido");
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