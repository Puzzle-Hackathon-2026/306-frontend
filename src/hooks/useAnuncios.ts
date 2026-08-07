import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";

export interface Anuncio {
    id: string;
    titulo: string;
    descripcion: string;
    coloniaId: string | null;
    createdAt: string;
}

export function useAnuncios() {
    const [anuncios, setAnuncios] = useState<Anuncio[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelado = false;

        apiFetch<Anuncio[]>("/api/announcements")
            .then((data) => {
                if (!cancelado) setAnuncios(data);
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

    return { anuncios, loading, error };
}