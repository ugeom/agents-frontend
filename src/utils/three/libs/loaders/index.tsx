// App imports
import { createAndInject } from '../../inject';

// Third-party imports
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader.js';

export interface LoaderDependencies {
	GLTFLoader: typeof GLTFLoader;
	FontLoader: typeof FontLoader;
	RGBELoader: typeof RGBELoader;
	PLYLoader: typeof PLYLoader;
}

export const injectLoaderDependencies = (): LoaderDependencies => {
	const dependencies = createAndInject({
		GLTFLoader,
		FontLoader,
		RGBELoader,
		PLYLoader
	});
	
	// Also inject loaders into THREE namespace for backward compatibility
	if (typeof window !== 'undefined') {
		const THREE = (window as any).THREE;
		if (THREE) {
			THREE.GLTFLoader = GLTFLoader;
			THREE.FontLoader = FontLoader;
			THREE.RGBELoader = RGBELoader;
			THREE.PLYLoader = PLYLoader;
		}
	}
	
	return dependencies;
};