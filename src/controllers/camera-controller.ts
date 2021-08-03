import { PerspectiveCamera } from 'three';

export default class CameraController {
  private static _instance: CameraController;
  private camera: PerspectiveCamera | null = null;

  private constructor() {}

  public static get instance() {
    if(!CameraController._instance) {
      CameraController._instance = new CameraController();
    }

    return CameraController._instance;
  }

  init() {
    if(this.camera === null) {
      this.camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 50000);
      this.camera.position.set(0, 200, 350);
      this.camera.updateProjectionMatrix();
  
      console.log('Camera Controller initialized');
    }
  }

  getCamera() {
    return this.camera;
  }
}