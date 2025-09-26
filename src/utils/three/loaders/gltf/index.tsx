// App imports
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

// Third-party imports
import * as THREE from 'three';

export const createGLTFLoader = () => {
	const gltfLoader = new GLTFLoader();
	const dracoLoader = new DRACOLoader();
	dracoLoader.setDecoderPath('/draco/');
	dracoLoader.preload();
	gltfLoader.setDRACOLoader(dracoLoader);
	return gltfLoader;
};

export const enhanceMaterials = (model: THREE.Object3D) => {
	model.traverse((child: any) => {
		if (child.isMesh && child.material) {
			if (Array.isArray(child.material)) {
				child.material.forEach((mat: any) => {
					if (mat.isMeshStandardMaterial || mat.isMeshPhysicalMaterial) {
						mat.roughness = 0.8;
						mat.metalness = 0.0;
						mat.emissive = new THREE.Color(0.0, 0.0, 0.0);
						mat.emissiveIntensity = 0.0;
					}
				});
			}
			else if (child.material.isMeshStandardMaterial || child.material.isMeshPhysicalMaterial) {
				child.material.roughness = 0.8;
				child.material.metalness = 0.0;
				child.material.emissive = new THREE.Color(0.0, 0.0, 0.0);
				child.material.emissiveIntensity = 0.0;
			}
		}
	});
};