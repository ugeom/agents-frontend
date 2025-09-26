// Utils imports
import { fetchMapboxIsochrone } from './isochrone';

// Third-party imports
import * as turf from '@turf/turf';

const getCircle = (marker: any) => {
	const { center, radius } = marker;
	const { lng, lat } = center
	return turf.circle([lng, lat], radius);
};

export const getBoundary = async (marker: any) => {
	if (marker.boundaryType === 'iso') {
		const result = await fetchMapboxIsochrone(marker);
		return result.success ? result.data : null;
	}
	return getCircle(marker);
};