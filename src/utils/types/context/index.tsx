// Context related types
import { ReactNode } from 'react';

export interface ContextProviderProps {
  children: ReactNode;
}

export interface GeoContextType {
  mapRef: React.RefObject<any>;
  mapStyle: string;
  setMapStyle: (style: string) => void;
  viewport: any;
  setViewport: (viewport: any) => void;
  placeInfo: string;
}

export interface EventsContextType {
  searchActive: boolean;
  setSearchActive: (active: boolean) => void;
  cursorActive: boolean;
  setCursorActive: (active: boolean) => void;
  maskActive: boolean;
  setMaskActive: (active: boolean) => void;
  boundaryActive: boolean;
  setBoundaryActive: (active: boolean) => void;
}

export interface ApiContextType {
  fetchRag: (question: any, metaData: any) => Promise<any>;
}