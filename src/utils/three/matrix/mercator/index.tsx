// Third-party imports
import * as THREE from 'three';
import mapboxgl from 'mapbox-gl';

export const getMercatorMatrix = ({ lng, lat }: any, altitude: any) => {
	const merc = mapboxgl.MercatorCoordinate.fromLngLat({ lng, lat }, altitude);
	const scale = merc.meterInMercatorCoordinateUnits();
	
	const translation = new THREE.Matrix4().makeTranslation(merc.x, merc.y, merc.z);
	const rotationX = new THREE.Matrix4().makeRotationX(Math.PI / 2);
	const scaling = new THREE.Matrix4().makeScale(scale * 100, scale * 100, scale * 100);

	const mercatorMatrix = new THREE.Matrix4()
		.multiply(translation)
		.multiply(rotationX)
		.multiply(scaling);
	
	return mercatorMatrix;
};