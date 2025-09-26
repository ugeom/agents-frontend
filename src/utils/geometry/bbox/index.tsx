// Types imports
import { GeoJSONFeature, BBox } from 'utils/types/geometry';

// Third-party imports
import * as turf from '@turf/turf';

export const bboxIntersects = (feature: GeoJSONFeature, bboxBoundary: BBox) => {
  const [minX, minY, maxX, maxY] = turf.bbox(feature);
  const [bMinX, bMinY, bMaxX, bMaxY] = bboxBoundary;
  return !(maxX < bMinX || minX > bMaxX || maxY < bMinY || minY > bMaxY);
};