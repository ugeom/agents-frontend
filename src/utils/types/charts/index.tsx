// Chart data processing types
export interface ChartData {
  distribution: Record<string, number>;
  colors: Record<string, string>;
}

export interface ChartGeoJSONFeature {
  properties: Record<string, string | number>;
}

export interface GeoJSONData {
  features: ChartGeoJSONFeature[];
}

export interface DotsProps {
    distribution: Record<string, number>;
    colors: Record<string, string>;
    sumOfValues: number;
}