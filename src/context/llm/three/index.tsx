	// React imports
	import { useEffect, useContext, createContext } from 'react';

	// Functions imports
	import { getMercatorMatrix, getEcefMatrix } from 'utils/three';

	// Context imports
	import { useGeo } from 'context/geo';
	import { useThreejsLayer } from 'context/threejs';
	import { useAgentApi } from 'context/agent';

	// Third-party imports
	import * as RAPIER from '@dimforge/rapier3d';
	import * as CANNON from 'cannon-es';
	import * as THREE from 'three';
	import * as d3 from 'd3';
	import mapboxgl from 'mapbox-gl';

	// Loaders
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

	// Effects
	import { AnaglyphEffect } from 'three/examples/jsm/effects/AnaglyphEffect.js';
	import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';
	import { OutlineEffect } from 'three/examples/jsm/effects/OutlineEffect.js';
	import { ParallaxBarrierEffect } from 'three/examples/jsm/effects/ParallaxBarrierEffect.js';
	import { StereoEffect } from 'three/examples/jsm/effects/StereoEffect.js';

	// Controls
	import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
	import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';
	import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';
	import { MapControls } from 'three/examples/jsm/controls/MapControls.js';
	import { DragControls } from 'three/examples/jsm/controls/DragControls.js';

	// Geometries
	import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
	import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry.js';
	import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
	import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry.js';

	// Other examples
	import { Water } from 'three/examples/jsm/objects/Water.js';
	import { Sky } from 'three/examples/jsm/objects/Sky.js';
	import { SkyMesh } from 'three/examples/jsm/objects/SkyMesh.js';
	import { GPUComputationRenderer } from 'three/examples/jsm/misc/GPUComputationRenderer.js';
	import { LightProbeHelper } from 'three/examples/jsm/helpers/LightProbeHelper.js';
	import { OctreeHelper } from 'three/examples/jsm/helpers/OctreeHelper.js';
	import { SVGRenderer } from 'three/examples/jsm/renderers/SVGRenderer.js';
	import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare.js';
	import { LensflareMesh } from 'three/examples/jsm/objects/LensflareMesh.js';
	import { CSS3DRenderer, CSS3DObject, CSS3DSprite } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
	import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

	// Post processing
	import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
	import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
	import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
	import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

	import { 
		RollerCoasterGeometry, 
		RollerCoasterShadowGeometry, 
		RollerCoasterLiftersGeometry 
	} from 'three/examples/jsm/misc/RollerCoaster.js';

	const ThreeContext: React.Context<any> = createContext(null)

	export const useThree = () => {
		return (
			useContext(ThreeContext)
		)
	}

	// Extend window type
	declare global {
		interface Window {
			THREE: typeof THREE;
			mapboxgl: typeof mapboxgl;
			scene: THREE.Scene;
			renderer: THREE.WebGLRenderer;
			camera: any;
			GLTFLoader: GLTFLoader;
			FontLoader: FontLoader;
			TextGeometry: TextGeometry;
			Water: Water;
			Sky: Sky;
			SkyMesh: SkyMesh;
			ParallaxBarrierEffect: ParallaxBarrierEffect;
			AnaglyphEffect: AnaglyphEffect;
			AsciiEffect: AsciiEffect;
			OutlineEffect: OutlineEffect;
			StereoEffect: StereoEffect;
			PointerLockControls: PointerLockControls;
			FirstPersonControls: FirstPersonControls;
			FlyControls: FlyControls;
			MapControls: MapControls;
			DragControls: DragControls;
			GPUComputationRenderer: GPUComputationRenderer;
			ParametricGeometry: ParametricGeometry;
			RoundedBoxGeometry: RoundedBoxGeometry;
			ConvexGeometry: ConvexGeometry;
			LightProbeHelper: LightProbeHelper;
			OctreeHelper: OctreeHelper;
			SVGRenderer: SVGRenderer;
			CSS3DObject: CSS3DObject;
			CSS3DRenderer: CSS3DRenderer;
			CSS3DSprite: CSS3DSprite;
			Lensflare: Lensflare;
			LensflareElement: LensflareElement;
			LensflareMesh: LensflareMesh;
			RGBELoader: RGBELoader;
			EffectComposer: EffectComposer;
			RenderPass: RenderPass;
			ShaderPass: ShaderPass;
			UnrealBloomPass: UnrealBloomPass;
			RollerCoasterGeometry: RollerCoasterGeometry;
			RollerCoasterShadowGeometry: RollerCoasterShadowGeometry;
			RollerCoasterLiftersGeometry: RollerCoasterLiftersGeometry;
			draggableObjects: any;
			Ammo: any;
			RAPIER: any;
			CANNON: any;
			d3: any;
			mapRef: any;
		}
	}

	export const ThreeProvider = ({children}: any) => {
		const { agentData } = useAgentApi();
		const { mapRef } = useGeo();
		const { rendererRef, cameraRef, sceneRef, draggableObjects } = useThreejsLayer();

		useEffect(() => {
			if (!agentData || !agentData.result || !(agentData.tool_name === "get_three")) return;
			
			const threeData = agentData.result

			try {
				// Inject dependencies into global scope
				(window as any).mapboxgl = mapboxgl;
				(window as any).THREE = THREE;
				(window as any).getMercatorMatrix = getMercatorMatrix;
				(window as any).getEcefMatrix = getEcefMatrix;
				(window as any).scene = sceneRef.current;
				(window as any).camera = cameraRef.current;
				(window as any).renderer = rendererRef.current;
				(window as any).mapRef = mapRef;
				(window as any).GLTFLoader = GLTFLoader;
				(window as any).FontLoader = FontLoader;
				(window as any).TextGeometry = TextGeometry;
				(window as any).Water = Water;
				(window as any).Sky = Sky;
				(window as any).SkyMesh = SkyMesh;
				(window as any).ParallaxBarrierEffect = ParallaxBarrierEffect;
				(window as any).AnaglyphEffect = AnaglyphEffect;
				(window as any).AsciiEffect = AsciiEffect;
				(window as any).OutlineEffect = OutlineEffect;
				(window as any).StereoEffect = StereoEffect;
				(window as any).PointerLockControls = PointerLockControls;
				(window as any).FirstPersonControls = FirstPersonControls;
				(window as any).FlyControls = FlyControls;
				(window as any).MapControls = MapControls;
				(window as any).DragControls = DragControls;
				(window as any).GPUComputationRenderer = GPUComputationRenderer;
				(window as any).ParametricGeometry = ParametricGeometry;
				(window as any).RoundedBoxGeometry = RoundedBoxGeometry;
				(window as any).ConvexGeometry = ConvexGeometry;
				(window as any).LightProbeHelper = LightProbeHelper;
				(window as any).OctreeHelper = OctreeHelper;
				(window as any).SVGRenderer = SVGRenderer;
				(window as any).CSS3DRenderer = CSS3DRenderer;
				(window as any).CSS3DObject = CSS3DObject;
				(window as any).CSS3DSprite = CSS3DSprite;
				(window as any).Lensflare = Lensflare;
				(window as any).LensflareElement = LensflareElement;
				(window as any).LensflareMesh = LensflareMesh;
				(window as any).RGBELoader = RGBELoader;
				(window as any).EffectComposer = EffectComposer;
				(window as any).RenderPass = RenderPass;
				(window as any).ShaderPass = ShaderPass;
				(window as any).UnrealBloomPass = UnrealBloomPass;
				(window as any).RollerCoasterGeometry = RollerCoasterGeometry;
				(window as any).RollerCoasterShadowGeometry = RollerCoasterShadowGeometry;
				(window as any).RollerCoasterLiftersGeometry = RollerCoasterLiftersGeometry;
				(window as any).RAPIER = RAPIER;
				(window as any).CANNON = CANNON;
				(window as any).d3 = d3;
				(window as any).draggableObjects = draggableObjects;

				// Parse the code and join it into one executable string
				const codeArray = JSON.parse(threeData)['code'];

				const fullCode = codeArray.join('\n')
					.replaceAll("map.", "mapRef.current.getMap().")
					.replaceAll("THREE.Lensflare", "Lensflare")
					.replaceAll("THREE.LensflareElement", "LensflareElement")
					.replaceAll("THREE.LensflareMesh", "LensflareMesh")
					.replaceAll("THREE.GLTFLoader", "GLTFLoader")
					.replaceAll("THREE.FontLoader", "FontLoader")
					.replaceAll("THREE.TextGeometry", "TextGeometry")
					.replaceAll("THREE.Sky", "Sky")
					.replaceAll("THREE.SkyMesh", "SkyMesh")
					.replaceAll("THREE.ParallaxBarrierEffect", "ParallaxBarrierEffect")
					.replaceAll("THREE.AnaglyphEffect", "AnaglyphEffect")
					.replaceAll("THREE.AsciiEffect", "AsciiEffect")
					.replaceAll("THREE.StereoEffect", "StereoEffect")
					.replaceAll("THREE.PointerLockControls", "PointerLockControls")
					.replaceAll("THREE.FirstPersonControls", "FirstPersonControls")
					.replaceAll("THREE.FlyControls", "FlyControls")
					.replaceAll("THREE.MapControls", "MapControls")
					.replaceAll("THREE.DragControls", "DragControls")
					.replaceAll("THREE.GPUComputationRenderer", "GPUComputationRenderer")
					.replaceAll("THREE.ParametricGeometry", "ParametricGeometry")
					.replaceAll("THREE.RoundedBoxGeometry", "RoundedBoxGeometry")
					.replaceAll("THREE.ConvexGeometry", "ConvexGeometry")
					.replaceAll("THREE.LightProbeHelper", "LightProbeHelper")
					.replaceAll("THREE.OctreeHelper", "OctreeHelper")
					.replaceAll("THREE.Octree", "OctreeHelper")
					.replaceAll("THREE.SVGRenderer", "SVGRenderer")
					.replaceAll("THREE.CSS3DRenderer", "CSS3DRenderer")
					.replaceAll("THREE.CSS3DObject", "CSS3DObject")
					.replaceAll("THREE.CSS3DSprite", "CSS3DSprite")
					.replaceAll("THREE.RGBELoader", "RGBELoader")
					.replaceAll("THREE.EffectComposer", "EffectComposer")
					.replaceAll("THREE.RenderPass", "RenderPass")
					.replaceAll("THREE.ShaderPass", "ShaderPass")
					.replaceAll("THREE.UnrealBloomPass", "UnrealBloomPass")
					.replaceAll("THREE.RollerCoasterGeometry", "RollerCoasterGeometry")
					.replaceAll("THREE.RollerCoasterShadowGeometry", "RollerCoasterShadowGeometry")
					.replaceAll("THREE.RollerCoasterLiftersGeometry", "RollerCoasterLiftersGeometry")
					.replaceAll("THREE.Water", "Water");

				// Execute all at once to preserve variable scope
				console.log(fullCode)
				const fn = new Function(fullCode);
				fn();
			} catch (err) {
				console.error('Error executing mesh code:', err);
			}
		}, [ agentData ]);

		return (
			<ThreeContext.Provider value={{ }}>
				{children}
			</ThreeContext.Provider>
		)
	}

	ThreeContext.displayName = "ThreeContext";