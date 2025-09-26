// Utils imports
import { addColorToFeature } from './colors';

// Third-party imports
import * as turf from '@turf/turf';

const bboxIntersects = (feature: any, bboxBoundary: number[]) => {
  const [minX, minY, maxX, maxY] = turf.bbox(feature);
  const [bMinX, bMinY, bMaxX, bMaxY] = bboxBoundary;
  return !(maxX < bMinX || minX > bMaxX || maxY < bMinY || minY > bMaxY);
};

const explodeGeometry = (geometry: any, properties: any) => {
  const { type, coordinates } = geometry;

  if (type.startsWith('Multi')) {
    const baseType = type.replace('Multi', '');
    return coordinates.map((coords: any) => ({
      type: 'Feature',
      geometry: { type: baseType, coordinates: coords },
      properties,
    }));
  }

  return [{ type: 'Feature', geometry, properties }];
};

const linesWithin = (features: any[], boundary: any, bboxBoundary: number[]) =>
  features.flatMap((feature) => {
    if (!bboxIntersects(feature, bboxBoundary)) return [];
    if (turf.booleanWithin(feature, boundary)) return [feature];
    if (turf.booleanIntersects(feature, boundary)) {
      return turf
        .lineSplit(feature, boundary)
        .features.filter((f) => turf.booleanWithin(f, boundary))
        .map((f) => ({ ...f, properties: feature.properties }));
    }
    return [];
  });

const centroidsWithin = (features: any[], boundary: any, bboxBoundary: number[]) =>
  features.filter(({ geometry }) => {
    const centroid = turf.centroid(geometry);
    if (!bboxIntersects(centroid, bboxBoundary)) return false;
    return turf.booleanPointInPolygon(centroid, boundary);
  });

export const filterGeometries = (mapFeatures: any[], boundary: any, fillProperty: string, type: string): any => {
  const bboxBoundary = turf.bbox(boundary)
  const filterFn = type === 'LineString' ? linesWithin : centroidsWithin;
  return mapFeatures.flatMap(({ geometry, layer, properties, source }: any) => {
    const features = explodeGeometry(geometry, properties);
    const within = filterFn(features, boundary, bboxBoundary);
    return within.map((f: any) => addColorToFeature(f.geometry, f.properties, layer, source, fillProperty));
  });
};