// App imports
import { createAndInject } from '../../inject';

// Third-party imports
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry.js';
import { 
	RollerCoasterGeometry, 
	RollerCoasterShadowGeometry, 
	RollerCoasterLiftersGeometry 
} from 'three/examples/jsm/misc/RollerCoaster.js';

export interface GeometryDependencies {
	TextGeometry: typeof TextGeometry;
	ParametricGeometry: typeof ParametricGeometry;
	RoundedBoxGeometry: typeof RoundedBoxGeometry;
	ConvexGeometry: typeof ConvexGeometry;
	RollerCoasterGeometry: typeof RollerCoasterGeometry;
	RollerCoasterShadowGeometry: typeof RollerCoasterShadowGeometry;
	RollerCoasterLiftersGeometry: typeof RollerCoasterLiftersGeometry;
}

export const injectGeometryDependencies = (): GeometryDependencies => {
	const dependencies = createAndInject({
		TextGeometry,
		ParametricGeometry,
		RoundedBoxGeometry,
		ConvexGeometry,
		RollerCoasterGeometry,
		RollerCoasterShadowGeometry,
		RollerCoasterLiftersGeometry
	});
	
	// Also inject geometries into THREE namespace for backward compatibility
	if (typeof window !== 'undefined') {
		const THREE = (window as any).THREE;
		if (THREE) {
			THREE.TextGeometry = TextGeometry;
			THREE.ParametricGeometry = ParametricGeometry;
			THREE.RoundedBoxGeometry = RoundedBoxGeometry;
			THREE.ConvexGeometry = ConvexGeometry;
			THREE.RollerCoasterGeometry = RollerCoasterGeometry;
			THREE.RollerCoasterShadowGeometry = RollerCoasterShadowGeometry;
			THREE.RollerCoasterLiftersGeometry = RollerCoasterLiftersGeometry;
		}
	}
	
	return dependencies;
};