declare module 'three/examples/jsm/loaders/GLTFLoader' {
    import { Loader } from 'three';
    import { Group } from 'three';
  
    export class GLTFLoader extends Loader {
      load(
        url: string,
        onLoad: (gltf: { scene: Group; animations: any[]; cameras: any[]; asset: any }) => void,
        onProgress?: (event: ProgressEvent) => void,
        onError?: (error: ErrorEvent) => void
      ): void;
    }
  }