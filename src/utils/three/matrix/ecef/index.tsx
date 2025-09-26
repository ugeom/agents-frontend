// Third-party imports
import * as THREE from 'three';
import mapboxgl from 'mapbox-gl';

const meterInECEFUnits = (altitude: any) => {
  const EXTENT = 8192;
  const GLOBE_RADIUS = EXTENT / Math.PI / 2;
  const earthRadius = 63710088e-1;
  const radiusAtAlt = earthRadius + altitude;
  return GLOBE_RADIUS / radiusAtAlt;
};

const getRotation = (lng: any, lat: any) => {
	const phi = THREE.MathUtils.degToRad(lat);
	const lambda = THREE.MathUtils.degToRad(lng);

	const rotX = Math.PI / 2 - phi;
	const rotY = lambda + Math.PI;
	const rotZ = Math.PI;

	const rotationFromEuler = new THREE.Euler(rotX, rotY, rotZ, 'YXZ');
	return rotationFromEuler;
}

export const getEcefMatrix = ({ lng, lat }: any, altitude: any) => {
	const validLat = Math.max(-90, Math.min(90, lat));
	const validLng = ((lng % 360) + 360) % 360;
	const normalizedLng = validLng > 180 ? validLng - 360 : validLng;
	
	const ecef = mapboxgl.LngLat.convert([normalizedLng, validLat]).toEcef(altitude);
	const scale = meterInECEFUnits(altitude);
	const rotationFromEuler = getRotation(normalizedLng, validLat);

	const translation = new THREE.Matrix4().makeTranslation(...ecef);
	const rotation = new THREE.Matrix4().makeRotationFromEuler(rotationFromEuler);
	const scaling = new THREE.Matrix4().makeScale(scale * 100, scale * 100, scale * 100);

	const ecefMatrix = new THREE.Matrix4()
		.multiply(translation)
		.multiply(rotation)
		.multiply(scaling);

	return ecefMatrix;
}