// Third-party imports
import * as THREE from 'three';
import * as RAPIER from '@dimforge/rapier3d';
import * as CANNON from 'cannon-es';
import * as d3 from 'd3';
import mapboxgl from 'mapbox-gl';

import { createAndInject } from '../../inject';

export interface CoreDependencies {
	THREE: typeof THREE;
	scene?: THREE.Scene;
	renderer?: THREE.WebGLRenderer;
	camera?: any;
	controls?: any;
	RAPIER: typeof RAPIER;
	d3: typeof d3;
	mapboxgl: typeof mapboxgl;
	CANNON: typeof CANNON;
	world?: CANNON.World;
}

export const injectCoreDependencies = (
	scene: THREE.Scene,
	renderer: THREE.WebGLRenderer,
	camera: any,
	controls: any
): CoreDependencies => {
	const world = new CANNON.World();
	world.gravity.set(0, -9.82, 0);
	world.broadphase = new CANNON.NaiveBroadphase();
	
	return createAndInject({ THREE, scene, renderer, camera, controls, RAPIER, d3, mapboxgl, CANNON, world });
};