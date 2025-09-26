// React imports
import { useEffect, useRef, useState } from 'react';

// App imports
import './styles.scss';

// Utils imports
import { createGLTFLoader, enhanceMaterials } from 'utils/three/loaders/gltf';

// Third-party imports
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface GLBThumbnailProps {
  url: string;
  onClick?: () => void;
  className?: string;
}

export const GLBThumbnail = ({ url, onClick, className }: GLBThumbnailProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  const [ dimensions, setDimensions ] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Get container dimensions
    const containerWidth = mountRef.current.offsetWidth;
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      containerWidth / containerWidth, // Will be updated after model loads
      0.1,
      1000
    );

    // Renderer setup - Dark background for better contrast
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(new THREE.Color(0.08, 0.08, 0.08), 1);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    // Wait a frame for DOM attachment, then setup orbit controls
    requestAnimationFrame(() => {
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enableZoom = true;
      controls.enablePan = false;
      controls.enableRotate = true;
      controls.mouseButtons = {
        LEFT: THREE.MOUSE.ROTATE,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.PAN
      };
      controlsRef.current = controls;
    });

    // Enhanced lighting setup for better visibility from all angles
    const ambientLight = new THREE.AmbientLight(new THREE.Color(0.4, 0.4, 0.4), 0.6);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(new THREE.Color(0.9, 0.9, 0.85), 0.8);
    directionalLight1.position.set(10, 10, 5);
    directionalLight1.castShadow = true;
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(new THREE.Color(0.8, 0.8, 0.9), 0.6);
    directionalLight2.position.set(-10, 5, -5);
    scene.add(directionalLight2);

    const hemisphereLight = new THREE.HemisphereLight(
      new THREE.Color(0.5, 0.5, 0.6), // brighter sky
      new THREE.Color(0.2, 0.2, 0.25), // brighter ground
      0.8
    );
    scene.add(hemisphereLight);

    // Create GLB loader using shared utility
    const gltfLoader = createGLTFLoader();

    gltfLoader.load(
      url,
      (gltf) => {
        const model = gltf.scene;
        
        // Calculate bounding box and center the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        // Center the model
        model.position.sub(center);
        
        // Scale model to fit in view
        const maxDimension = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDimension;
        model.scale.setScalar(scale);
        
        // Enhance materials for brighter appearance
        enhanceMaterials(model);
        
        scene.add(model);
        
        // Calculate proportional dimensions based on model bounding box
        const aspectRatio = size.x / size.z; // width / depth
        const containerWidth = mountRef.current?.offsetWidth || 300;
        const calculatedHeight = containerWidth / aspectRatio;
        const maxHeight = 200; // Maximum height limit
        const finalHeight = Math.min(calculatedHeight, maxHeight);
        
        // Update dimensions state
        setDimensions({ width: containerWidth, height: finalHeight });
        
        // Update camera aspect ratio and renderer size
        const finalAspectRatio = containerWidth / finalHeight;
        camera.aspect = finalAspectRatio;
        camera.updateProjectionMatrix();
        renderer.setSize(containerWidth, finalHeight);
        
        // Position camera
        const distance = Math.max(2, maxDimension * 0.5);
        camera.position.set(distance, distance * 0.5, distance);
        camera.lookAt(0, 0, 0);
        
        // Animation loop (no auto-rotation, just for controls and rendering)
        const animate = () => {
          animationRef.current = requestAnimationFrame(animate);
          
          // Update controls if they exist
          if (controlsRef.current) {
            controlsRef.current.update();
          }
          
          renderer.render(scene, camera);
        };
        animate();
      },
      (progress) => {
        // Loading progress
      },
      (error) => {
        console.error('Error loading GLB model:', error);
      }
    );

    // Cleanup
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
      if (mountRef.current && rendererRef.current?.domElement) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [url]);

  return (
    <div 
      ref={mountRef} 
      className={`glb-thumbnail ${className || ''}`}
      style={{
        width: '100%',
        height: dimensions.height || '200px',
        minHeight: '200px'
      }}
    />
  );
};

GLBThumbnail.displayName = "GLBThumbnail";