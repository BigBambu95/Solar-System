import * as THREE from 'three';
import sceneBackground from '../textures/milky_way.jpg';

export default class SceneController {
  private static _instance: SceneController;
  private _scenes: Record<string, THREE.Scene> = {}
  private _currentScene: string = ''

  private constructor() {}

  public static get instance() {
    if(!SceneController._instance) {
      SceneController._instance = new SceneController();
    }

    return SceneController._instance;
  }

  public get currentScene() {
    return this._scenes[this._currentScene];
  }

  public init() {
      console.log('Scene Controller initialized');
      return 'success';
  }

  public selectScene(sceneName: string) {
    this._currentScene = sceneName
  }

  public createScene(sceneName: string) {
    if(this._scenes[sceneName]) return 

    const scene = new THREE.Scene();
    scene.name = sceneName
    const bgTexture = new THREE.TextureLoader().load(sceneBackground);
    bgTexture.minFilter = THREE.LinearFilter;
    scene.background = bgTexture;

    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.25);
    scene.add(hemisphereLight);
    this._scenes[sceneName] = scene
  }

}