import * as THREE from 'three';
import sceneBackground from '../textures/milky_way.jpg';

export default class SceneController {
  private static instance: SceneController;
  private scene = null;

  private constructor() {}

  public static getInstance(): SceneController {
    if(!SceneController.instance) {
      SceneController.instance = new SceneController();
    }

    return SceneController.instance;
  }

  public init(): string {
    if(this.scene === null) {
      this.scene = new THREE.Scene();
      const bgTexture = new THREE.TextureLoader().load(sceneBackground);
      bgTexture.minFilter = THREE.LinearFilter;
      this.scene.background = bgTexture;
  
      console.log('Scene Controller initialized');
      return 'success';
    }
  }

  public getScene(): THREE.Scene {
    return this.scene;
  }

}