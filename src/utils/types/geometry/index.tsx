// Geometry utility types - use GeoJSON standard types
import { Feature, Geometry, GeoJsonProperties, Polygon, MultiPolygon, LineString } from 'geojson';

export type GeoJSONGeometry = Geometry;
export type GeoJSONProperties = GeoJsonProperties;
export type GeoJSONFeature = Feature;
export type BBox = [number, number, number, number] | [number, number, number, number, number, number];
export type TurfFeature = Feature;
export type PolygonFeature = Feature<Polygon | MultiPolygon>;
export type LineStringFeature = Feature<LineString>;