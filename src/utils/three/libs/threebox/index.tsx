// App imports
import { createAndInject } from '../../inject';
import { enhanceMaterials } from '../../loaders/gltf';

// Third-party imports
import * as ThreeboxPlugin from 'threebox-plugin';
const Threebox = (ThreeboxPlugin as any).Threebox;

export interface ThreeboxDependencies {
	Threebox: typeof Threebox;
	createThreeboxLoader: () => any;
	loadModelWithThreebox: (url: string, coordinates: { lng: number; lat: number }, options?: any) => Promise<any>;
}

// Threebox layer setup - creates a proper threebox layer instead of using Custom Layer
const createThreeboxLayer = () => {
	return (mapRef: any) => {
		if (!mapRef?.current) {
			console.warn('Map reference not available for threebox');
			return null;
		}

		const map = mapRef.current.getMap();

		if (!map.isStyleLoaded()) {
			console.warn('Map style not yet loaded for threebox initialization');
			return null;
		}

		// Check if threebox layer already exists
		if (map.getLayer('threebox-layer')) {
			console.log('Threebox layer already exists');
			return map.tb;
		}

		// Create threebox as a custom layer that integrates properly
		const threeboxLayer: any = {
			id: 'threebox-layer',
			type: 'custom',
			renderingMode: '3d',
			onAdd: function (map: any, gl: any) {
				console.log('Adding threebox layer');

				// Create threebox instance
				const threebox = new Threebox(map, gl, {
					defaultLighting: true,
					enableSelectingObjects: false,
					enableDraggingObjects: false,
					enableRotatingObjects: false,
					enableTooltips: false,
				});

				// Add natural lighting to match Mapbox style
				const ambientLight = new (window as any).THREE.AmbientLight(0xffffff, 0.8);
				threebox.scene.add(ambientLight);
				const dirLight = new (window as any).THREE.DirectionalLight(0xffffff, 0.4);
				dirLight.position.set(0, 1, 0.5);
				threebox.scene.add(dirLight);

				// Store threebox instance
				this.threebox = threebox;
				map.tb = threebox;

				// Set global tb reference for AnimationManager
				if (typeof window !== 'undefined') {
					(window as any).tb = threebox;
				}
				if (typeof globalThis !== 'undefined') {
					(globalThis as any).tb = threebox;
				}

				console.log('Threebox layer added successfully with global tb reference');
			},
			render: function (gl: any, matrix: any) {
				if (this.threebox) {
					this.threebox.update();
				}
			}
		};

		// Add the threebox layer to the map
		map.addLayer(threeboxLayer);

		return null; // Will be set in onAdd callback
	};
};

// Model loading function that replaces matrix transformations
const loadModelWithThreebox = async (url: string, coordinates: { lng: number; lat: number }, options: any = {}) => {
	const {
		altitude = 0,
		scale = 1,
		rotation = { x: 0, y: 0, z: 0 },
		anchor = 'center',
		units = 'meters',
		mapRef,
		scene
	} = options;

	if (!mapRef?.current) {
		throw new Error('Map reference required for threebox model loading');
	}

	const map = mapRef.current.getMap();

	// Ensure threebox layer is initialized
	createThreeboxLayer()(mapRef);

	// Wait for threebox to be available
	return new Promise((resolve, reject) => {
		const checkThreebox = () => {
			if (map.tb) {
				loadModelInThreebox(map.tb, url, coordinates, { altitude, scale, rotation, anchor, units })
					.then(resolve)
					.catch(reject);
			} else {
				// Try again after a short delay
				setTimeout(checkThreebox, 100);
			}
		};
		checkThreebox();
	});
};

// Helper function to load model once threebox is ready
const loadModelInThreebox = async (threebox: any, url: string, coordinates: { lng: number; lat: number }, options: any) => {
	const { altitude, scale, rotation, anchor, units } = options;

	return new Promise((resolve, reject) => {
		// Use threebox's built-in model loading method
		threebox.loadObj({
			obj: url,
			type: 'gltf',
			units: units || 'meters',
			anchor: anchor || 'center',
			rotation: rotation || { x: 0, y: 0, z: 0 },
			scale: scale || 1
		}, (model: any) => {
			// Position the model
			model.setCoords([coordinates.lng, coordinates.lat]);

			// Set altitude (always apply, including 0)
			model.setTranslate(0, 0, altitude);

			// Apply additional rotation to fix vertical positioning
			if (model.model) {
				model.model.rotation.x += Math.PI / 2;
				// Force z position to match altitude
				model.model.position.z = altitude;

				// Apply enhanced materials from chat GLB implementation
				enhanceMaterials(model.model);
			}

			// Add to threebox scene
			threebox.add(model);

			console.log('Model loaded successfully with threebox native loading');

			resolve({
				threeboxModel: model,
				model: model.model,
				threebox: threebox,
				updatePosition: (newCoords: { lng: number; lat: number }, newAltitude?: number) => {
					model.setCoords([newCoords.lng, newCoords.lat]);
					if (newAltitude !== undefined) {
						model.setTranslate(0, 0, newAltitude);
					}
				},
				updateScale: (newScale: number) => {
					model.setScale(newScale, newScale, newScale);
				},
				updateRotation: (newRotation: { x: number; y: number; z: number }) => {
					model.setRotation(newRotation);
				},
				remove: () => {
					threebox.remove(model);
				}
			});
		});
	});
};

// Fallback function using the existing matrix transformation approach
const loadModelWithMatrixTransforms = async (url: string, coordinates: { lng: number; lat: number }, options: any = {}) => {
	const {
		altitude: initialAltitude = 0,
		scale = 1,
		rotation = { x: 0, y: 0, z: 0 },
		mapRef,
		scene
	} = options;

	// Use mutable variables for position tracking
	let currentAltitude = initialAltitude;
	const currentCoordinates = { ...coordinates };

	return new Promise((resolve, reject) => {
		// Use the global GLTFLoader if available
		const GLTFLoaderClass = (window as any).GLTFLoader;
		if (!GLTFLoaderClass) {
			console.error('GLTFLoader not available in global scope');
			reject(new Error('GLTFLoader not available'));
			return;
		}
		const loader = new GLTFLoaderClass();

		let model: any = null;

		loader.load(
			url,
			(gltf: any) => {
				model = gltf.scene;
				model.name = 'loaded-model-' + Date.now();
				model.matrixAutoUpdate = false;
				model.frustumCulled = false;

				// Set initial scale and rotation
				if (scale !== 1) {
					model.scale.setScalar(scale);
				}

				if (rotation.x !== 0 || rotation.y !== 0 || rotation.z !== 0) {
					model.rotation.set(rotation.x, rotation.y, rotation.z);
				}

				// Apply enhanced materials from chat GLB implementation
				enhanceMaterials(model);

				// Add to scene immediately
				if (scene && !scene.getObjectByName(model.name)) {
					scene.add(model);
				}

				// Set up render loop for matrix updates
				const map = mapRef?.current?.getMap();
				if (map) {
					const updateMatrix = () => {
						if (model && scene.getObjectByName(model.name)) {
							const isGlobe = map.getProjection().name === 'globe';
							// Use the existing matrix functions
							if ((window as any).getEcefMatrix && (window as any).getMercatorMatrix) {
								model.matrix = isGlobe
									? (window as any).getEcefMatrix(currentCoordinates, currentAltitude)
									: (window as any).getMercatorMatrix(currentCoordinates, currentAltitude);
							}
						}
					};

					map.on('render', updateMatrix);
					updateMatrix(); // Initial update
				}

				resolve({
					model,
					threeboxModel: null, // No threebox model in fallback
					threebox: null,
					updatePosition: (newCoords: { lng: number; lat: number }, newAltitude?: number) => {
						currentCoordinates.lng = newCoords.lng;
						currentCoordinates.lat = newCoords.lat;
						if (newAltitude !== undefined) {
							currentAltitude = newAltitude;
						}
					},
					updateScale: (newScale: number) => {
						if (model) {
							model.scale.setScalar(newScale);
						}
					},
					updateRotation: (newRotation: { x: number; y: number; z: number }) => {
						if (model) {
							model.rotation.set(newRotation.x, newRotation.y, newRotation.z);
						}
					},
					remove: () => {
						if (model && scene) {
							scene.remove(model);
						}
					}
				});
			},
			(progress: any) => {
				// Loading progress
			},
			(error: any) => {
				console.error('Error loading GLB model:', error);
				reject(error);
			}
		);
	});
};

export const injectThreeboxDependencies = (): ThreeboxDependencies => {
	const dependencies = createAndInject({
		Threebox,
		createThreeboxLoader: createThreeboxLayer,
		loadModelWithThreebox
	});

	// Add to THREE namespace for backward compatibility
	if (typeof window !== 'undefined') {
		const THREE = (window as any).THREE;
		if (THREE) {
			THREE.Threebox = Threebox;
			THREE.createThreeboxLoader = createThreeboxLayer;
			THREE.loadModelWithThreebox = loadModelWithThreebox;
		}
	}

	return dependencies;
};