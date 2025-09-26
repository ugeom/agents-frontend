// Map related types
export interface ViewportType {
  longitude: number;
  latitude: number;
  zoom: number;
  bearing?: number;
  pitch?: number;
}

export interface MapRef {
  getMap: () => any;
  flyTo: (options: any) => void;
  fitBounds: (bounds: any, options?: any) => void;
}