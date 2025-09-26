declare module 'threebox-plugin' {
  import * as THREE from 'three';
  import * as mapboxgl from 'mapbox-gl';

  export interface ThreeboxOptions {
    defaultLighting?: boolean;
    enableSelectingObjects?: boolean;
    enableDraggingObjects?: boolean;
    enableRotatingObjects?: boolean;
    enableTooltips?: boolean;
  }

  export interface Object3DOptions {
    obj: THREE.Object3D;
    units?: string;
    anchor?: string;
  }

  export interface ThreeboxObject {
    setCoords(coords: [number, number]): void;
    setTranslate(x: number, y: number, z: number): void;
    setScale(x: number, y: number, z: number): void;
    setRotation(rotation: { x: number; y: number; z: number }): void;
  }

  export class Threebox {
    constructor(map: mapboxgl.Map, context: WebGLRenderingContext, options?: ThreeboxOptions);

    Object3D(options: Object3DOptions): ThreeboxObject;
    add(object: ThreeboxObject): void;
    remove(object: ThreeboxObject): void;
    clear(): void;
  }
}