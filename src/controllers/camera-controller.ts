import { PerspectiveCamera } from 'three';

export default class CameraController {
  private static instance: CameraController;
  private camera = null;

  private constructor() {}

  public static getInstance(): CameraController {
    if(!CameraController.instance) {
      CameraController.instance = new CameraController();
    }

    return CameraController.instance;
  }

  public init() {
    if(this.camera === null) {
      this.camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 50000);
      this.camera.position.set(0, 200, 350);
      this.camera.updateProjectionMatrix();
  
      console.log('Camera Controller initialized');
    }
  }

  public getCamera(): PerspectiveCamera {
    return this.camera;
  }
}