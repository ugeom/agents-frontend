// Marker related types
export interface ProviderType {
  name: string;
  provider: string;
  source: string;
  layer: string;
  columnName: string;
  geometryType: string;
}

export interface MarkerType {
  id: number;
  center: { lng: number; lat: number };
  radius: number;
  boundaryType: "iso" | "circle";
  routingProfile: "walking" | "cycling" | "driving";
  contoursMinutes: number;
  fillColor: string;
  fillOpacity: number;
  strokeWidth: number;
  strokeColor: string;
  strokeOpacity: number;
  layer: string;
  image: string;
  activeTrash: boolean;
  boundary?: GeoJSON.Feature<GeoJSON.Polygon> | null;
  data?: GeoJSON.FeatureCollection | null;
  // Provider properties spread dynamically
  [key: string]: any;
}

export interface MarkersContextType {
  markers: Record<string, MarkerType>;
  setMarkers: React.Dispatch<React.SetStateAction<Record<string, MarkerType>>>;
  startAddingMarker: (src: string, provider: ProviderType) => void;
  buildMarker: (e: { lngLat: { lng: number; lat: number } }) => void;
  removeMarker: (event: React.MouseEvent, markerId: string | number) => void;
  updateMarkerProperty: (id: string | number, property: string, value: string | number | boolean | { lng: number; lat: number }) => void;
  currentMarkerId: number | null;
  setCurrentMarkerId: (id: number | null) => void;
  currentImage: string | null;
  setCurrentImage: (src: string | null) => void;
  currentProvider: ProviderType | null;
  setCurrentProvider: (provider: ProviderType | null) => void;
  activePage: string | null;
  setActivePage: (page: string | null) => void;
  isAddingMarker: boolean;
  setIsAddingMarker: (adding: boolean) => void;
  generateMarkerId: () => number;
  createMarker: (center: { lng: number; lat: number }) => MarkerType;
}