import * as THREE from 'three';
import CameraController from './camera-controller';
import Controller from '../index';

export default class MouseController {
  private static instance: MouseController;
  private raycaster = null;
  private mouse = null;
  private intersected = null

  private constructor() {
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  // Singleton
  public static getInstance() {
    if(!MouseController.instance) {
      MouseController.instance = new MouseController();
    }

    return MouseController.instance;
  }

  private onMouseMove(e: MouseEvent) {
    e.preventDefault();

    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1; 
  }

  private onClick() {
    if(this.intersected) {
      history.pushState([], this.intersected.name, `/${this.intersected.name.toLowerCase()}`)
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
    this.raycaster.setFromCamera(this.mouse, CameraController.getInstance().getCamera());

    const intersects = this.raycaster.intersectObjects(Controller.getInstance().planets.map(item => item.sphere));

    if(intersects.length > 0) {
      if(this.intersected != intersects[0].object) {
          if (this.intersected) this.intersected.material.emissive.setHex(this.intersected.currentHex);

          document.body.style.cursor = 'pointer'
          this.intersected = intersects[0].object;
          this.intersected.currentHex = this.intersected.material.emissive.getHex();
          this.intersected.material.emissive.setHex( 0xff0000 );
      }
    } else {
      if (this.intersected) this.intersected.material.emissive.setHex(this.intersected.currentHex );

      document.body.style.cursor = 'default'
      this.intersected = null;
    }
    
  }
  
}