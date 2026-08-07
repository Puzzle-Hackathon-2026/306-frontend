import { useEffect, useState } from "react";

/**
 * Router mínimo basado en window.history, sin dependencias externas.
 * Alcanza para 2-3 rutas fijas. Si el proyecto crece, migrar a
 * react-router-dom ("pnpm add react-router-dom").
 */
export function useRoute() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return path;
}

export function navigate(path: string) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}
