import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Stats from 'three/examples/jsm/libs/stats.module.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SceneController, AudioController, MouseController, CameraController } from './controllers';


import { planets } from './classes/data';

import Planet from './classes/planet';
import Orbit from './classes/orbit';
import Star from './classes/star';

import sunImg from './textures/sun.jpg';
import asteroidModel from './models/asteroid1.gltf';
import asteroidTexture from './textures/asteroid1_BaseColor.jpg';
import asteroidNormalTexture from './textures/asteroid1_Normal.jpg';
import asteroidRoughnessTexture from './textures/asteroid1_OcclusionRoughnessMetallic.jpg';
import AsteroidBelt from './classes/asteroid-belt';

class Controller implements IController {

  private static instance: Controller;
  container = null;
  scene = null;
  renderer = null;
  camera = null;
  orbitControls = null;
  stats = null;
  distanceScale = 3;
  timeScale = 2;
  sun = null;
  planets = [];
  asteroidBelt = null;

  private constructor() {

    this.animate = this.animate.bind(this);
  }

  public static getInstance() {
    if(!Controller.instance) {
      Controller.instance = new Controller();
    }

    return Controller.instance;
  }

  private initRenderer(): void {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container = document.getElementById('container');
    this.container.appendChild(this.renderer.domElement);
  }

  private initSun(): void {
    this.sun = new Star('Sun', 'star', 10, 32, 32, sunImg).render();
    const sunLight = new THREE.PointLight( 0xffffff, 1.25, 10000, 3 );
    this.sun.add(sunLight);
    this.scene.add(this.sun);
  }

  private initPlanets(): void {
    planets.forEach((data) => {
      const { 
        radius, texture, distanceFromStar, orbitalPeriod, tilt, rotationPeriod, 
        orbitalInclination, semimajorAxis, eccentricity, perihelion, 
        aphelion, retrogradeMotion, moons, group, name 
      } = data;
      
      const planet = new Planet(
        name, group, radius, 32, 32, texture, distanceFromStar / this.distanceScale + 10, 
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
  }

  private animate() {
    this.sun.rotation.y += 2 * Math.PI / 1500;
    this.planets.forEach(planet => planet.animate());
    this.asteroidBelt.animate();
    MouseController.getInstance().animate();

    this.renderer.render(this.scene, this.camera);
    this.orbitControls.update();
    this.stats.update();
    requestAnimationFrame(this.animate);
  }

  public init() {
    SceneController.getInstance().init();
    CameraController.getInstance().init();
    MouseController.getInstance().init();
    AudioController.getInstance().init();
    this.scene = SceneController.getInstance().getScene();
    this.camera = CameraController.getInstance().getCamera();
    this.initRenderer();
    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
    this.orbitControls.update();
    this.stats = Stats();
    this.container.appendChild(this.stats.dom);
    this.initSun();
    this.initPlanets();

    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.05);
    this.scene.add(hemisphereLight);

    const loader = new GLTFLoader();
    let asteroid = new THREE.Object3D();

    loader.load(asteroidModel, 
      (object3d) => {
        asteroid = object3d.scene;
        const spriteMap = new THREE.TextureLoader().load(asteroidTexture);
        const normalMap = new THREE.TextureLoader().load(asteroidNormalTexture);
        const roughnessMap = new THREE.TextureLoader().load(asteroidRoughnessTexture);
        const material = new THREE.MeshStandardMaterial({ map: spriteMap, normalMap: normalMap, roughnessMap: roughnessMap, color: 0xffffff });
        const mesh: any = asteroid.children[0];
        mesh.material = material;

        this.asteroidBelt = new AsteroidBelt(asteroid);
        this.asteroidBelt.render();

        this.animate();
      }, 
      (xhr) => console.log('3D model ' + (xhr.loaded / xhr.total * 100 ) + '% loaded'),
      (err) => console.error(err)
    );
    

  }

}


Controller.getInstance().init();


export default Controller;

// Moon 
// const moon = new Moon(1, 32, 32, moonImg, 25 / 3, 1620, 1.5, 60);
// const moonRender = moon.render();
// const moonOrbit = new Orbit(25 / 3, 5).render();

// earth.sphere.add(moonRender);
// earth.sphere.add(moonOrbit);







