// Types imports
import { GeoJSONGeometry, GeoJSONProperties, GeoJSONFeature } from 'utils/types/geometry';

const colorPalette = [
  'rgba(216, 131, 255, 0.6)',
  'rgba(247, 121, 118, 0.6)',
  'rgba(250, 189, 74, 0.6)',
  'rgba(255, 232, 8, 0.6)',
  'rgba(82, 227, 225, 0.6)',
  'rgba(123, 210, 223, 0.6)',
  'rgba(2, 194, 178, 0.6)',
  'rgba(255, 152, 0, 0.6)',
  'rgba(155, 48, 255, 0.6)',
  'rgba(34, 255, 102, 0.6)'
];

const hashStringToNumber = (str: string): number => {
  const safeStr = String(str ?? "");
  return safeStr.split("").reduce((acc: number, c: string) => acc + c.charCodeAt(0), 0);
}

export const getFeatureColor = (feature: string): string => {
  const hash = hashStringToNumber(feature);
  return colorPalette[hash % colorPalette.length];
};

export const processColor = (paint: any, property: string) => {
  const result: any = {};
  const color = paint[property];
  if (color) {
    const { r, g, b, a } = color;
    result[property] = `
      rgba(
        ${Math.round(r * 255)}, 
        ${Math.round(g * 255)}, 
        ${Math.round(b * 255)}, 
        ${a}
      )
    `.replace(/\s/g, '');
  }
  return result;
};

export const addColorToFeature = (geometry: any, properties: any, layer: any, source: any, fillProperty: any) => {
  const color = source === 'composite'
      ? getFeatureColor(properties.type)
      : processColor(layer.paint, fillProperty)[fillProperty];

  return { 
    type: 'Feature', 
    geometry, 
    properties: { 
      ...properties, 
      [fillProperty]: color 
    } 
  };
};