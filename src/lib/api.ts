const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5222";

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${API_URL}${path}`, {
        headers: { "Content-Type": "application/json", ...options?.headers },
        ...options,
    });

    if (!res.ok) {
        throw new Error(`API error ${res.status}: ${await res.text()}`);
    }

    return res.json() as Promise<T>;
}