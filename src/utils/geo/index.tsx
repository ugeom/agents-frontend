// Third-party imports
import * as d3 from 'd3';

export const createFeatureCollection = (features: any[]) => {
    return { type: "FeatureCollection", features };
};

export const extractCoordinatesFromPolygon = (coordinates: any, type: string) => {
    return type === "Polygon" ? coordinates.flat(1) : coordinates.flat(2);
};

export const createGeoFeature = (geometry: any, properties = {}) => {
    return { type: "Feature", geometry, properties };
};

export const calculateBounds = (coordinates: [number, number][]) => {
    const [minLng, maxLng] = d3.extent(coordinates, (d: any) => d[0]);
    const [minLat, maxLat] = d3.extent(coordinates, (d: any) => d[1]);
    return [[minLng, minLat], [maxLng, maxLat]];
};

export const fitMapToBounds = (
    mapRef: any,
    coordinates: [number, number][],
    options = { padding: 50, duration: 3000 }
) => {
    if (coordinates.length) {
        const bounds = calculateBounds(coordinates);
        mapRef.current?.fitBounds(bounds, options);
    }
};