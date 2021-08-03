import * as THREE from 'three';
import sceneBackground from '../textures/milky_way.jpg';

export default class SceneController {
  private static _instance: SceneController;
  private _scene: THREE.Scene | null = null;

  private constructor() {}

  public static get instance() {
    if(!SceneController._instance) {
      SceneController._instance = new SceneController();
    }

    return SceneController._instance;
  }

  public init() {
    if(this._scene === null) {
      this._scene = new THREE.Scene();
      const bgTexture = new THREE.TextureLoader().load(sceneBackground);
      bgTexture.minFilter = THREE.LinearFilter;
      this._scene.background = bgTexture;

      const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.25);
      this._scene.add(hemisphereLight);
  
  
      console.log('Scene Controller initialized');
      return 'success';
    }
  }

  public get scene() {
    return this._scene;
  }

}