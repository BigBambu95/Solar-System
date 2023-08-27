import { PerspectiveCamera } from 'three';

export default class CameraController {
  private static _instance: CameraController;
  private _camera: PerspectiveCamera | null = null;

  private constructor() {}

  public static get instance() {
    if(!CameraController._instance) {
      CameraController._instance = new CameraController();
    }

    return CameraController._instance;
  }

  init() {
    if(this.camera === null) {
      this._camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 50000);
      this._camera.position.set(0, 200, 350);
      this._camera.updateProjectionMatrix();
  
      console.log('Camera Controller initialized');
    }
  }

  get camera() {
    return this._camera;
  }
}