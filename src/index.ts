import * as THREE from 'three';
import FBXLoader from 'three-fbx-loader';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import AudioController from './controllers/audio-controller';
import MouseController from './controllers/mouse-controller';

import { planets } from './classes/data';

import Planet from './classes/planet';
import Orbit from './classes/orbit';
import Star from './classes/star';

import sunImg from './textures/sun.jpg';
import bg from './textures/milky_way.jpg';
import asteroidModel from './models/asteroid1.fbx';

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
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 50000);
    this.camera.position.set(0, 200, 350);
    this.camera.updateProjectionMatrix();
  }

  private initScene() {
    this.scene = new THREE.Scene();
    const bgTexture = new THREE.TextureLoader().load(bg);
    bgTexture.minFilter = THREE.LinearFilter;
    this.scene.background = bgTexture;
  }

  private initSun() {
    this.sun = new Star('star', 10, 32, 32, sunImg).render();
    const sunLight = new THREE.PointLight( 0xffffff, 1.25, 10000, 2 );
    this.sun.add(sunLight);
    this.scene.add(this.sun);
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
    this.initScene();
    this.initCamera();
    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
    this.orbitControls.update();
    this.initSun();

    const loader = new FBXLoader();

    loader.load(asteroidModel, (object3d) => {
      try {
        object3d.position.set(50, 0, 50);
        object3d.scale.set(0.5, 0.5, 0.5);
        console.log(object3d.children[0]);
        this.scene.add(object3d.children[0]);
      } catch(err) {
        console.error(err);
      }

    });

    planets.forEach((data) => {
      const { 
        radius, texture, distanceFromStar, orbitalPeriod, tilt, rotationPeriod, 
        orbitalInclination, semimajorAxis, eccentricity, perihelion, 
        aphelion, retrogradeMotion, moons, group 
      } = data;
      
      const planet = new Planet(
        group, radius, 32, 32, texture, distanceFromStar / this.distanceScale + 10, 
        orbitalPeriod, tilt, rotationPeriod, orbitalInclination, retrogradeMotion, 
        semimajorAxis / this.distanceScale + 10, eccentricity, perihelion / this.distanceScale + 10, 
        aphelion / this.distanceScale + 10, moons
      );

      const orbit = new Orbit(group, orbitalInclination, perihelion / this.distanceScale + 10, aphelion / this.distanceScale + 10, semimajorAxis / this.distanceScale + 10, eccentricity);
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
AudioController.getInstance().init();
MouseController.getInstance().init();


// Moon 
// const moon = new Moon(1, 32, 32, moonImg, 25 / 3, 1620, 1.5, 60);
// const moonRender = moon.render();
// const moonOrbit = new Orbit(25 / 3, 5).render();

// earth.sphere.add(moonRender);
// earth.sphere.add(moonOrbit);







