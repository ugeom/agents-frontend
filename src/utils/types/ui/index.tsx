// UI utility types
export type CursorCallback = () => void;

export interface DragEvent {
  lngLat: [number, number];
  stopPropagation: () => void;
}

export type UpdateMarkerPropertyFunction = (
  id: string | number, 
  property: string, 
  value: any
) => void;