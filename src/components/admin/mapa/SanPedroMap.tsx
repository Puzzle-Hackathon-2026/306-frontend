import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  SPS_BOUNDS,
  SPS_CENTER,
  SPS_DEFAULT_ZOOM,
  SPS_MIN_ZOOM,
} from "../../../lib/mapConfig";

interface Props {
  children: React.ReactNode;
}

/**
 * Mapa base limitado a San Pedro Sula. maxBoundsViscosity=1 impide
 * arrastrar el mapa fuera de los límites de la ciudad; minZoom evita
 * alejarse hasta ver el resto del país.
 */
export default function SanPedroMap({ children }: Props) {
  return (
    <MapContainer
      center={SPS_CENTER}
      zoom={SPS_DEFAULT_ZOOM}
      minZoom={SPS_MIN_ZOOM}
      maxBounds={SPS_BOUNDS}
      maxBoundsViscosity={1.0}
      scrollWheelZoom
      className="w-full h-[420px] rounded-lg z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        bounds={SPS_BOUNDS}
      />
      {children}
    </MapContainer>
  );
}
