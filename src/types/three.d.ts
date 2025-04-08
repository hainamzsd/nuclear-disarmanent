declare module 'three/examples/jsm/controls/OrbitControls' {
    import { Camera, EventDispatcher, Object3D, Vector2 } from 'three';
  
    export class OrbitControls extends EventDispatcher {
      constructor(object: Camera, domElement: HTMLElement);
  
      object: Camera;
      domElement: HTMLElement;
      enabled: boolean;
      target: Vector2;
      enablePan : boolean;
      minDistance: number;
      maxDistance: number;
      minPolarAngle: number;
      maxPolarAngle: number;
      enableDamping: boolean;
      dampingFactor: number;
      enableZoom: boolean;
      zoomSpeed: number;
      enableRotate: boolean;
      rotateSpeed: number;
  
      update(): void;
      dispose(): void;
      listenToKeyEvents(domElement: HTMLElement): void;
    }
  }
  