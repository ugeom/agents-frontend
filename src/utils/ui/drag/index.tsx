// Types imports
import { DragEvent, UpdateMarkerPropertyFunction } from 'utils/types/ui';

// Internal dragging state (module scoped)
let isDragging = false;

export const getIsDragging = () => isDragging;

export const handleDragStart = (e: DragEvent, id: string | number, updateMarkerProperty: UpdateMarkerPropertyFunction) => {
  isDragging = true;
  updateMarkerProperty(id, 'activeTrash', false);
};

export const handleDrag = (e: DragEvent, id: string | number, boundaryType: string, updateMarkerProperty: UpdateMarkerPropertyFunction) => {
  if (boundaryType !== "iso") {
    updateMarkerProperty(id, "center", e.lngLat);
  }
};

export const handleDragEnd = (e: DragEvent, id: string | number, boundaryType: string, updateMarkerProperty: UpdateMarkerPropertyFunction) => {
  setTimeout(() => { isDragging = false }, 0);
  if (boundaryType === "iso") {
    updateMarkerProperty(id, "center", e.lngLat);
  }
};

export const toggleMarkerTrash = (e: { stopPropagation: () => void }, id: string | number, activeTrash: boolean, updateMarkerProperty: UpdateMarkerPropertyFunction) => {
  e.stopPropagation();
  if (!isDragging) {
    updateMarkerProperty(id, 'activeTrash', !activeTrash);
  }
};