// Types imports
import { GeoJSONFeature, BBox, PolygonFeature } from 'utils/types/geometry';

// Utils imports
import { bboxIntersects } from 'utils/geometry/bbox';

// Third-party imports
import * as turf from '@turf/turf';

export const centroidsWithin = (
  features: GeoJSONFeature[], 
  boundary: PolygonFeature, 
  bboxBoundary: BBox
) =>
  features.filter(({ geometry }) => {
    const centroid = turf.centroid(geometry);
    if (!bboxIntersects(centroid, bboxBoundary)) return false;
    return turf.booleanPointInPolygon(centroid, boundary);
  });