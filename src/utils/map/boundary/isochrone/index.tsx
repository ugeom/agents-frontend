// Utils imports
import { MAPBOX_TOKEN } from 'utils/map/token';

const BASE_URL = 'https://api.mapbox.com/isochrone/v1/mapbox/';

interface IsochroneParams {
	routingProfile: string;
	center: { lng: number; lat: number };
	contoursMinutes: number;
}

interface ApiResult<T> {
	success: boolean;
	data?: T;
	error?: {
		error: string;
		code?: string;
		details?: string;
	};
}

export const fetchMapboxIsochrone = async ({ routingProfile, center, contoursMinutes }: IsochroneParams): Promise<ApiResult<GeoJSON.Feature<GeoJSON.Polygon>>> => {
	const { lng, lat } = center;

	const params = new URLSearchParams({
		access_token: MAPBOX_TOKEN,
		contours_minutes: contoursMinutes.toString(),
		polygons: 'true',
		denoise: '1',
	});

	const tempUrl = `
		${BASE_URL}
		${routingProfile}/
		${lng}%2C${lat}
		?${params}
	`;
	const url = tempUrl.replace(/\s/g, '');

	try {
		const res = await fetch(url);
		if (!res.ok) {
			const errorMessage = `HTTP ${res.status}: ${res.statusText}`;
			console.warn(`Isochrone API error: ${errorMessage}`);
			return {
				success: false,
				error: {
					error: 'Isochrone request failed',
					code: res.status.toString(),
					details: errorMessage
				}
			};
		}
		const receivedData = await res.json();
		const feature = receivedData.features?.[0];
		if (!feature) {
			return {
				success: false,
				error: {
					error: 'No isochrone data found',
					details: 'No isochrone features returned'
				}
			};
		}
		return {
			success: true,
			data: feature
		};
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'Unknown error';
		console.warn('Isochrone API error:', errorMessage);
		return {
			success: false,
			error: {
				error: 'Isochrone request failed',
				details: errorMessage
			}
		};
	}
};