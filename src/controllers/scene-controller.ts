import * as THREE from 'three';
import sceneBackground from '../textures/milky_way.jpg';

export default class SceneController {
  private static _instance: SceneController;
  private scene: THREE.Scene | null = null;

  private constructor() {}

  public static get instance() {
    if(!SceneController._instance) {
      SceneController._instance = new SceneController();
    }

    return SceneController._instance;
  }

  public init() {
    if(this.scene === null) {
      this.scene = new THREE.Scene();
      const bgTexture = new THREE.TextureLoader().load(sceneBackground);
      bgTexture.minFilter = THREE.LinearFilter;
      this.scene.background = bgTexture;

      const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.25);
      this.scene.add(hemisphereLight);
  
  
      console.log('Scene Controller initialized');
      return 'success';
    }
  }

  public getScene() {
    return this.scene;
  }

}