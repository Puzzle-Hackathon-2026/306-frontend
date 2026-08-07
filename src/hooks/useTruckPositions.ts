import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";

export interface PosicionCamion {
    truckId: string;
    lat: number;
    lng: number;
    estado: "activo" | "pausa" | "incidente" | "fuera_de_ruta";
    conductor: string | null;
    avance: number | null;
    coloniaId: string | null;
    reportesEnZona: number;
    distanciaKm: number | null;
    registradoEn: string;
}

export function useTruckPositions() {
    const [camiones, setCamiones] = useState<PosicionCamion[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelado = false;

        apiFetch<PosicionCamion[]>("/api/truckpositions")
            .then((data) => {
                if (!cancelado) setCamiones(data);
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

    return { camiones, loading, error };
}