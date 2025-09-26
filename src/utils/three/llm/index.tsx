// App imports
import { injectCoreDependencies, type CoreDependencies } from '../libs/core';
import { injectLoaderDependencies, type LoaderDependencies } from '../libs/loaders';
import { injectGeometryDependencies, type GeometryDependencies } from '../libs/geometries';
import { injectEffectDependencies, type EffectDependencies } from '../libs/effects';
import { injectControlDependencies, type ControlDependencies } from '../libs/controls';
import { injectHelperDependencies, type HelperDependencies } from '../libs/helpers';
import { injectPostProcessingDependencies, type PostProcessingDependencies } from '../libs/postprocessing';
import { injectThreeboxDependencies, type ThreeboxDependencies } from '../libs/threebox';

// Third-party imports
import * as THREE from 'three';

export type AllThreeDependencies =
	CoreDependencies &
	LoaderDependencies &
	GeometryDependencies &
	EffectDependencies &
	ControlDependencies &
	HelperDependencies &
	PostProcessingDependencies &
	ThreeboxDependencies;

export interface DependencyInjectionParams {
	scene: THREE.Scene;
	renderer: THREE.WebGLRenderer;
	camera: any;
	controls: any;
}

export const injectAllThreeDependencies = (params: DependencyInjectionParams): AllThreeDependencies => {
	const { scene, renderer, camera, controls } = params;
	
	return Object.assign(
		injectCoreDependencies(scene, renderer, camera, controls),
		injectLoaderDependencies(),
		injectGeometryDependencies(),
		injectEffectDependencies(),
		injectControlDependencies(),
		injectHelperDependencies(),
		injectPostProcessingDependencies(),
		injectThreeboxDependencies()
	);
};

export {
	injectCoreDependencies,
	injectLoaderDependencies,
	injectGeometryDependencies,
	injectEffectDependencies,
	injectControlDependencies,
	injectHelperDependencies,
	injectPostProcessingDependencies,
	injectThreeboxDependencies
};

export type {
	CoreDependencies,
	LoaderDependencies,
	GeometryDependencies,
	EffectDependencies,
	ControlDependencies,
	HelperDependencies,
	PostProcessingDependencies,
	ThreeboxDependencies
};