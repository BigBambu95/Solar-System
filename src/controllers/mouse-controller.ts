import * as THREE from 'three';
import CameraController from './camera-controller';
import MainController from './main-controller';
import SceneController from './scene-controller';

export default class MouseController {
  private static _instance: MouseController;
  private raycaster: THREE.Raycaster | null = null;
  private mouse: THREE.Vector2 | null = null;
  private intersected: THREE.Object3D | null = null

  private constructor() {
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  public static get instance() {
    if(!MouseController._instance) {
      MouseController._instance = new MouseController();
    }

    return MouseController._instance;
  }

  private onMouseMove(e: MouseEvent) {
    if(!this.mouse) return
    e.preventDefault();

    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1; 
  }

  private onClick() {
    if(this.intersected) {
      SceneController.instance.createScene(this.intersected.name)
      SceneController.instance.selectScene(this.intersected.name)
    }
  }

  // Инициализируем контроллер
  init() {
    if(this.mouse === null) {
      this.raycaster = new THREE.Raycaster();
      this.mouse = new THREE.Vector2();
 
      window.addEventListener('mousemove', this.onMouseMove, false);
      window.addEventListener('click', this.onClick, false);
      console.log('Mouse Controller initialized');
    }
  }

  public animate() {
    if(!this.mouse || !this.raycaster || !CameraController.instance.camera) return
    this.raycaster.setFromCamera(this.mouse, CameraController.instance.camera);

    const intersects = this.raycaster.intersectObjects(MainController.instance.planets.map(item => item.sphere!));

    if(intersects.length > 0) {
      if(this.intersected != intersects[0].object) {
          // if (this.intersected) {
          //   this.intersected.material.emissive.setHex(this.intersected.currentHex);
          // }

          document.body.style.cursor = 'pointer'
          this.intersected = intersects[0].object;
          // this.intersected.currentHex = this.intersected.material.emissive.getHex();
          // this.intersected.material.emissive.setHex(0xff0000);
      }
    } else {
      // if (this.intersected) {
      //   this.intersected.material.emissive.setHex(this.intersected.currentHex);
      // } 

      document.body.style.cursor = 'default'
      this.intersected = null;
    }
    
  }
  
}