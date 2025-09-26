// React imports
import { useRef, useContext, createContext } from 'react';

// Context imports
import { useGeo } from 'context/geo';

// Third-party imports
import * as THREE from 'three';

const ThreejsLayerContext: React.Context<any> = createContext(null)

export const useThreejsLayer = () => useContext(ThreejsLayerContext);

export const ThreejsLayerProvider = ({ children }: any) => {
  const { mapRef } = useGeo();
  
  const globeSceneRef = useRef(new THREE.Scene());
  const sceneRef = useRef(new THREE.Scene());

  const cameraRef = useRef(new THREE.Camera());
  const rendererRef = useRef<any>(null);

  const draggableObjects: any[] = [];

  const threejsLayer = {
    id: 'threejs-layer',
    type: 'custom',
    renderingMode: '3d',

    onAdd(map: any, gl: any) {
      const renderer = new THREE.WebGLRenderer({
        canvas: map.getCanvas(),
        context: gl,
        antialias: true
      })

      renderer.autoClear = false;
      rendererRef.current = renderer;

      const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
      sceneRef.current.add(hemiLight);
    },

    render(gl: any, matrix: any, projection: any, globeToMercMatrix: any, transition: number) {
      const scene = sceneRef.current;
      const renderer = rendererRef.current;
      const camera = cameraRef.current;

      const map = mapRef?.current?.getMap();

      if (!map) return;
      
      const m = new THREE.Matrix4().fromArray(matrix);
      let pm = m;

      if (projection?.name === 'globe') {
        const gm = new THREE.Matrix4().fromArray(globeToMercMatrix);
        pm = m.multiply(gm);
      }
      
      camera.projectionMatrix.copy(pm);

      renderer.resetState();
    
      // render globe
      renderer.render(globeSceneRef.current, camera);
      
      renderer.clearDepth();
      // layers on top of the globe
      renderer.render(scene, camera);

      map.triggerRepaint();
    }
  }

  return (
    <ThreejsLayerContext.Provider
      value={{
        rendererRef,
        sceneRef,
        cameraRef,
        draggableObjects,
        threejsLayer
      }}
    >
      {children}
    </ThreejsLayerContext.Provider>
  );
};