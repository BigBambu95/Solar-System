import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { planets } from './data';

import Planet from './planet';
import Orbit from './orbit';
import Star from './star';

import sunImg from './textures/sun.jpg';
import moonImg from './textures/moon.jpg';

class Controller implements IController {

  private static instance: Controller;
  renderer = null;
  scene = null;
  camera = null;
  orbitControls = null;
  distanceScale = 3;
  timeScale = 2;
  sun = null;
  planets = [];

  private constructor() {

    this.animate = this.animate.bind(this);
  }

  public static getInstance() {
    if(!Controller.instance) {
      Controller.instance = new Controller();
    }

    return Controller.instance;
  }

  private initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
  }

  private initCamera() {
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 3000);
    this.camera.position.set(0, 200, 350);
    this.camera.updateProjectionMatrix();
  }

  private animate() {
    this.sun.rotation.y += 2 * Math.PI / 1500;
    this.planets.forEach(planet => planet.animate());

    this.renderer.render(this.scene, this.camera);
    this.orbitControls.update();
    requestAnimationFrame(this.animate);
  }

  public init() {
    this.initRenderer();
    this.scene = new THREE.Scene();
    this.initCamera();
    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
    this.orbitControls.update();

    this.sun = new Star(10, 32, 32, sunImg).render();
    this.scene.add(this.sun);

    planets.forEach((data) => {
      const { radius, texture, distanceFromStar, orbitalPeriod, tilt, rotationPeriod, orbitalInclination } = data;
      const planet = new Planet(radius, 32, 32, texture, distanceFromStar / this.distanceScale, orbitalPeriod, tilt, rotationPeriod, orbitalInclination);
      const orbit = new Orbit(distanceFromStar / this.distanceScale, orbitalInclination);
      const planetModel = planet.render();
      const orbitModel = orbit.render();
      this.scene.add(planetModel);
      this.scene.add(orbitModel);
      this.planets.push(planet);
    });

    this.animate();
  }

}

Controller.getInstance().init();

// Moon 
// const moon = new Moon(1, 32, 32, moonImg, 25 / 3, 1620, 1.5, 60);
// const moonRender = moon.render();
// const moonOrbit = new Orbit(25 / 3, 5).render();

// earth.sphere.add(moonRender);
// earth.sphere.add(moonOrbit);







