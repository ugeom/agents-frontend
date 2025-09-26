// React imports
import { useContext, createContext } from 'react';

// App imports
import { getFeaturesBySource } from 'utils/map/filter';
import { filterGeometries } from 'utils/map/within';
import { getBoundary } from 'utils/map/boundary';

// Context imports
import { useMarkers } from 'context/events/markers';
import { useGeo } from 'context/geo';

const BoundaryContext: React.Context<any> = createContext(null);

// Constants
const fillProperties: Record<string, string> = {
  Points: 'circle-color',
  Polygon: 'fill-color',
  LineString: 'line-color',
};

export const useBoundary = () => useContext(BoundaryContext)

export const BoundaryProvider = ({ children }: any) => {
	const { mapRef } = useGeo();
	const { setMarkers } = useMarkers();

	const getType = (geometryType: any) => {
		const isLine = geometryType.includes('LineString');
		const isPolygon = geometryType.includes('Polygon');

		const type = isLine ? 'LineString' : isPolygon ? 'Polygon' : 'Point';
		return type;
	}

	const getGeojson = (featuresBySource: any, boundary: any, geometryType: string) => {
	  const fillProperty = fillProperties[geometryType] || 'fill-color';
	  const type = getType(geometryType);
	  const features = filterGeometries(featuresBySource, boundary, fillProperty, type);
	  return { type: 'FeatureCollection', features};
	};

	const updateMarkersData = async (marker: any) => {
		const { id, layer, geometryType } = marker;
		const boundary = await getBoundary(marker);

		const featuresBySource = getFeaturesBySource(mapRef.current, layer);
  	const data = getGeojson(featuresBySource, boundary, geometryType);

		setMarkers((prev: any) => ({
			...prev, [id]: { ...prev[id], boundary, data }
		}));
	};

	return (
		<BoundaryContext.Provider value={{
			updateMarkersData
		}}>
			{children}
		</BoundaryContext.Provider>
	)
}

BoundaryContext.displayName = "BoundaryContext";