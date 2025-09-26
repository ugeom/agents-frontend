// Utils imports
import { bboxIntersects } from './bbox';
import { addColorToFeature } from '../map/within/colors';
import { centroidsWithin } from './centroids';
import { linesWithin } from './lines';

// Third-party imports
import * as turf from '@turf/turf';

const explodeGeometry = (geometry: any, properties: any) => {
  if (!geometry.type.startsWith('Multi')) {
    return [{ type: 'Feature', geometry, properties }];
  }
  const baseType = geometry.type.replace('Multi', '');
  return geometry.coordinates.map((coords: any) => ({
    type: 'Feature',
    geometry: { type: baseType, coordinates: coords },
    properties,
  }));
};

export const getFeaturesWithinBoundary = (mapFeatures: any[], boundary: any, layerType: string) => {
  const bboxBoundary = turf.bbox(boundary);
  const filterFn = layerType === 'line' ? linesWithin : centroidsWithin;
  return mapFeatures.flatMap(({ geometry, properties }) => {
    if (!bboxIntersects({ type: 'Feature', geometry, properties }, bboxBoundary)) return [];
    const features = explodeGeometry(geometry, properties);
    const within = filterFn(features, boundary, bboxBoundary);
    return within.map((f: any) => addColorToFeature(f.geometry, f.properties, null, 'composite', `${layerType}-color`));
  });
};