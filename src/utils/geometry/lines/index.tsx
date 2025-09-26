// Types imports
import { GeoJSONFeature, BBox, PolygonFeature } from 'utils/types/geometry';

// Utils imports
import { bboxIntersects } from 'utils/geometry/bbox';

// Third-party imports
import * as turf from '@turf/turf';

export const linesWithin = (
  features: GeoJSONFeature[], 
  boundary: PolygonFeature, 
  bboxBoundary: BBox
) =>
  features.flatMap((feature) => {
    if (!bboxIntersects(feature, bboxBoundary)) return [];
    if (turf.booleanWithin(feature, boundary)) return [feature];
    if (turf.booleanIntersects(feature, boundary)) {
      if (feature.geometry.type !== 'LineString') return [];
      return turf
        .lineSplit(feature as any, boundary)
        .features.filter((f) => turf.booleanWithin(f, boundary))
        .map((f) => ({ ...f, properties: feature.properties }));
    }
    return [];
  });