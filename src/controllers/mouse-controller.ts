import * as THREE from 'three';
import CameraController from './camera-controller';
import Controller from '../index';

export default class MouseController {
  private static instance: MouseController;
  private raycaster = null;
  private mouse = null;
  private planets = null;

  private constructor() {
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  public static getInstance() {
    if(!MouseController.instance) {
      MouseController.instance = new MouseController();
    }

    return MouseController.instance;
  }

  private onMouseMove(e) {
    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = - (e.clientY / window.innerHeight) * 2 + 1; 
  }

  public animate() {
    this.raycaster.setFromCamera(this.mouse, CameraController.getInstance().getCamera());

    // const intersects = this.raycaster.intersectObjects(Controller.getInstance().planets.map(item => item.sphere));

    // for(let i = 0; i < intersects.length; i++) {
    //   if(intersects[i].object.name) {

    //   }
    // }
 

  }

  init() {
    if(this.mouse === null) {
      this.raycaster = new THREE.Raycaster();
      this.mouse = new THREE.Vector2();
 
      // window.addEventListener('mousemove', this.onMouseMove, false);
      console.log('Mouse Controller initialized');
    }
  }
}