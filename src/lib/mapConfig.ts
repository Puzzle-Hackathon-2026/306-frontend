import type { LatLngBoundsExpression, LatLngTuple } from "leaflet";

// Límites aproximados de San Pedro Sula. Ajustar si el mapa se siente
// muy apretado o se cuela zona fuera de la ciudad.
export const SPS_BOUNDS: LatLngBoundsExpression = [
  [15.44, -88.08], // suroeste
  [15.58, -87.95], // noreste
];

export const SPS_CENTER: LatLngTuple = [15.5041, -88.025];
export const SPS_MIN_ZOOM = 12;
export const SPS_DEFAULT_ZOOM = 13;
