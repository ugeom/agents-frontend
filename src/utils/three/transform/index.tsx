import { injectControlDependencies } from '../libs/controls';
import { injectEffectDependencies } from '../libs/effects';
import { injectGeometryDependencies } from '../libs/geometries';
import { injectHelperDependencies } from '../libs/helpers';
import { injectLoaderDependencies } from '../libs/loaders';
import { injectPostProcessingDependencies } from '../libs/postprocessing';

// Code replacements for Three.js prefixed code to use global references
const codeReplacements: Record<string, string> = {
	"map.": "mapRef.current.getMap().",
	"window.animate": "animate",
	"orbitControls": "controls",
	"THREE.OrbitControls": "controls",
	"THREE.Octree": "OctreeHelper",
};

// Initialize all Three.js libs by injecting them to global scope
export const initializeDependencies = () => {
	injectControlDependencies();
	injectEffectDependencies();
	injectGeometryDependencies();
	injectHelperDependencies();
	injectLoaderDependencies();
	injectPostProcessingDependencies();
};

// Transform THREE.js prefixed code to use global references
export const transformCode = (codeArray: string[]): string => {
	let fullCode = codeArray.join('\n');
	
	Object.entries(codeReplacements).forEach(([from, to]) => {
		fullCode = fullCode.replaceAll(from, to);
	});

	return fullCode;
};