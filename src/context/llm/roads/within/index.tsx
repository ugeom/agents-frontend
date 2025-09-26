// Third-party imports
import * as turf from '@turf/turf';

export const linesWithin = (features: any[], boundary: any) => {
  const bboxBoundary = turf.bbox(boundary);

  return features.flatMap((feature) => {
    // Only process LineString geometries (roads)
    if (feature.geometry.type !== 'LineString') return [];

    // Check bbox intersection first for performance
    try {
      const featureBbox = turf.bbox(feature);
      const bboxFeature = turf.bboxPolygon(featureBbox)
      const bboxPolygon = turf.bboxPolygon(bboxBoundary);
      const intersection = turf.booleanIntersects(bboxFeature, bboxPolygon);
      if (!intersection) return [];
    } 
    catch (error) {
      return [];
    }

    // If entire line is within boundary, keep it
    if (turf.booleanWithin(feature, boundary)) return [feature];

    // If line intersects boundary, split it and keep only parts within boundary
    if (turf.booleanIntersects(feature, boundary)) {
      try {
        return turf
          .lineSplit(feature as any, boundary)
          .features.filter((f) => turf.booleanWithin(f, boundary))
          .map((f) => ({ ...f, properties: feature.properties }));
      } catch (error) {
        console.warn('Line split failed:', error);
        return [];
      }
    }
    return [];
  });
};