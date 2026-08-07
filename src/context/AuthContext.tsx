import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import { apiFetch } from "../lib/api";

export interface UsuarioPerfil {
    id: string;
    nombre: string;
    email: string;
    rol: string;
    coloniaId: string | null;
    coloniaNombre: string | null;
    createdAt: string;
}

interface AuthContextValue {
    session: Session | null;
    usuario: UsuarioPerfil | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<{ error: string | null }>;
    signUp: (
        nombre: string,
        email: string,
        password: string,
        coloniaId: string | null
    ) => Promise<{ error: string | null }>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [session, setSession] = useState<Session | null>(null);
    const [usuario, setUsuario] = useState<UsuarioPerfil | null>(null);
    const [loading, setLoading] = useState(true);

    const cargarPerfil = async (userId: string) => {
        try {
            const perfil = await apiFetch<UsuarioPerfil>(`/api/usuarios/${userId}`);
            setUsuario(perfil);
        } catch {
            // El auth.user existe en Supabase pero aún no tiene fila en tu tabla usuarios
            // (ej. registro interrumpido). Se deja usuario en null.
            setUsuario(null);
        }
    };

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session);
            if (data.session) cargarPerfil(data.session.user.id);
            setLoading(false);
        });

        const { data: listener } = supabase.auth.onAuthStateChange((_event, nuevaSession) => {
            setSession(nuevaSession);
            if (nuevaSession) {
                cargarPerfil(nuevaSession.user.id);
            } else {
                setUsuario(null);
            }
        });

        return () => listener.subscription.unsubscribe();
    }, []);

    const signIn: AuthContextValue["signIn"] = async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        return { error: error?.message ?? null };
    };

    const signUp: AuthContextValue["signUp"] = async (nombre, email, password, coloniaId) => {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) return { error: error.message };

        // Supabase no da error si el correo ya existe (para no revelar cuentas
        // existentes), pero regresa sin sesión real y con identities vacío.
        // Si no detectamos esto, se crea un perfil "fantasma" desincronizado.
        const identidadesVacias = data.user?.identities?.length === 0;
        if (!data.session || identidadesVacias) {
            return { error: "Ese correo ya está registrado. Intenta iniciar sesión en su lugar." };
        }

        if (!data.user) {
            return { error: "No se pudo crear la cuenta." };
        }

        try {
            const perfil = await apiFetch<UsuarioPerfil>("/api/usuarios", {
                method: "POST",
                body: JSON.stringify({ id: data.user.id, nombre, email, coloniaId }),
            });
            setUsuario(perfil);
        } catch (err) {
            return {
                error:
                    err instanceof Error
                        ? `Cuenta creada, pero no se pudo guardar el perfil: ${err.message}`
                        : "Cuenta creada, pero no se pudo guardar el perfil.",
            };
        }

        return { error: null };
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        setUsuario(null);
    };

    return (
        <AuthContext.Provider value={{ session, usuario, loading, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
    return ctx;
}