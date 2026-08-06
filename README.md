# CleanCity SPS — Frontend

Plataforma web para el hackathon CleanCity SPS. Conecta ciudadanos y la empresa operadora de recolección de basura mediante un mapa interactivo.

## Stack técnico

- **React** + **Vite** + **TypeScript**
- **Tailwind CSS v4** (vía plugin de Vite, sin `tailwind.config.js`)
- **React Leaflet** + OpenStreetMap — mapa interactivo
- **Recharts** — gráficas (usado en Módulo B)
- **Supabase-JS** — lecturas directas (indicador del día)

## Requisitos previos

- Node.js instalado
- pnpm (`npm install -g pnpm` si no lo tienes)

## Setup inicial

```bash
git clone <url-repo-frontend>
cd 306-frontend
pnpm install
```

Crea un archivo `.env.local` en la raíz (no se sube al repo, ya está en `.gitignore`):

```
VITE_SUPABASE_URL=https://<tu-proyecto>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<tu-publishable-key>
```

Ambos valores están en el dashboard de Supabase → **Connect → Framework (React + Vite)**. Esa misma pantalla te da el código exacto del cliente para pegar en `src/lib/supabase.ts` — úsalo tal cual en vez de escribirlo a mano, porque el nombre de la variable (`PUBLISHABLE_KEY`, ya no `ANON_KEY`) cambió recientemente en Supabase.

## Correr en desarrollo

```bash
pnpm dev
```

Abre `http://localhost:5173`.

## Estructura del proyecto

```
src/
├── components/
│   ├── VistaCiudadana.tsx      # Vista 01 · obligatoria
│   ├── PanelOperativo.tsx      # Vista 02 · obligatoria
│   ├── ModuloB.tsx             # Módulo opcional — Cobertura equitativa
│   └── ModuloC.tsx             # Módulo opcional — Reciclaje
├── lib/
│   └── supabase.ts             # Cliente de Supabase-JS
├── App.tsx
├── main.tsx
└── index.css
```

## Conectar con el backend

El backend (ASP.NET Core) corre normalmente en `http://localhost:5222`. Los endpoints disponibles están documentados en `contrato_api_cleancity.md` (compartido con el equipo). Resumen rápido:

| Método | Endpoint | Uso |
|---|---|---|
| GET | `/api/reports` | Listar reportes |
| POST | `/api/reports` | Crear reporte |
| PUT | `/api/reports/{id}` | Cambiar estado de un reporte |
| GET | `/api/colonias` | Listar colonias (dropdown, calendario) |
| GET | `/api/announcements` | Listar anuncios |
| POST | `/api/announcements` | Crear anuncio |
| GET | `/api/truckpositions` | Última posición de cada camión |
| GET | `/api/truckpositions/history/{truckId}` | Historial de un camión |

**Excepción:** el indicador del día (`vw_indicador_dia`) se lee directo de Supabase-JS, no pasa por el backend.

## Troubleshooting — cosas que ya nos pasaron

**`'tailwindcss' is not recognized`**
Estamos en Tailwind v4, que no tiene comando `init`. Usa el plugin de Vite en vez de PostCSS — revisa que `vite.config.ts` tenga `tailwindcss()` en los plugins y que `index.css` tenga `@import "tailwindcss";` arriba de todo.

**`EBUSY: resource busy or locked, watch '...vsidx'`**
Es la carpeta `.vs/` de Visual Studio bloqueando el file watcher de Vite. Agrega esto a `vite.config.ts`:
```ts
server: { watch: { ignored: ['**/.vs/**'] } }
```

**`Failed to load url /src/main.tsx`**
Los archivos exportados de Figma deben vivir dentro de `src/`, no en la raíz del proyecto.

**`Failed to load tsconfig 'tsconfig.app.json'`**
Falta copiar los archivos de configuración del scaffold estándar de Vite (`tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `vite.config.ts`, `index.html`, `package.json`) sobre el código exportado de Figma.

**`Failed to resolve import "recharts"` (o cualquier otra librería)**
El export de Figma asume librerías que no vienen instaladas. Busca todos los imports externos con:
```bash
findstr /s /n "from \"" src\components\*.tsx
```
E instala lo que falte con `pnpm add <paquete>`.

**Git no deja hacer commit — `Permission denied` en `.vs/`**
Cierra Visual Studio completamente y corre:
```bash
git rm -r --cached .vs
```

## Equipo

| Rol | Responsabilidad |
|---|---|
| Frontend | React, Tailwind, mapa, UX |
| Backend | ASP.NET Core, API, lógica de negocio |
| Base de Datos | Supabase, esquema, seed data |
| Líder técnico | Arquitectura, integración, merges, pitch |
