import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { SceneController, AudioController, MouseController, CameraController } from '../controllers';

import { planets, kuiperBelt, asteroidBelt } from '../classes/data';

import Planet from '../classes/planet';
import Orbit from '../classes/orbit';
import Star from '../classes/star';

import sunImg from '../textures/sun.jpg';
import asteroidModel from '../models/asteroid1.gltf';
import asteroidTexture from '../textures/asteroid1_BaseColor.jpg';
import asteroidNormalTexture from '../textures/asteroid1_Normal.jpg';
import asteroidRoughnessTexture from '../textures/asteroid1_OcclusionRoughnessMetallic.jpg';
import AsteroidBelt from '../classes/asteroid-belt';
import { ICelestialBody, IController } from '../types';

class Controller implements IController {
  private static _instance: Controller;
  scene: THREE.Scene | null = null;
  renderer: THREE.WebGLRenderer | null = null;
  camera: THREE.Camera | null = null;
  orbitControls: OrbitControls | null = null;
  stats: Stats | null = null;
  distanceScale = 3;
  timeScale = 2;
  sun: Star | null = null;
  planets: Planet[] = [];
  asteroidBelt: AsteroidBelt | null = null;
  kuiperBelt: AsteroidBelt | null = null;

  private constructor() {
    this.animate = this.animate.bind(this);
  }

  public static get instance() {
    if(!Controller._instance) {
      Controller._instance = new Controller();
    }

    return Controller._instance;
  }

  public getDistanceScale() {
    return this.distanceScale;
  }

  private initRenderer(container: HTMLElement) {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(this.renderer.domElement);
  }

  private initParentObject(object: any) {
    if(!this.scene) return

    this.sun = object;

    if(this.sun) {
      const sunMesh = this.sun.render()
      const sunLight = new THREE.PointLight( 0xffffff, 0.85, 10000, 0.5 );
      sunMesh.add(sunLight);
      this.scene.add(sunMesh); 
    }
  }

  private initPlanets(planets: ICelestialBody[]) {
    this.planets = []

    planets.forEach((data) => {
      const { 
        radius, texture, distanceFromStar, orbitalPeriod, tilt, rotationPeriod, 
        orbitalInclination, semimajorAxis, eccentricity, perihelion, 
        aphelion, retrogradeMotion, moons, group, name 
      } = data;
      
      const planet = new Planet(
        name, group, radius, 32, 32, texture, distanceFromStar / this.distanceScale + 10, 
        orbitalPeriod, tilt, rotationPeriod, orbitalInclination, 
        semimajorAxis / this.distanceScale + 10, eccentricity, perihelion / this.distanceScale + 10, 
        aphelion / this.distanceScale + 10, retrogradeMotion,  moons
      );

      const orbit = new Orbit(
        group, orbitalInclination, perihelion / this.distanceScale + 10, 
        aphelion / this.distanceScale + 10, semimajorAxis / this.distanceScale + 10, 
        eccentricity
      );
      
      if(this.scene) {
        this.scene.add(planet.render())
        this.scene.add(orbit.render())
        this.planets.push(planet)
      }
    });
  }

  private update() {
    if(this.scene !== SceneController.instance.currentScene) {
      this.scene = SceneController.instance.currentScene;
      const object = planets.find((planet) => planet.name === SceneController.instance.currentScene.name)
      this.initParentObject(
        object ? new Planet(object.name, object.group, object.radius, 32, 32, object.texture, 0, 0, 0, 
          object.rotationPeriod, 0, 0, 0, 0, 0, false, object.moons) 
        : new Star('Sun', 'star', 10, 32, 32, sunImg)
      )

      object?.moons && this.initPlanets(object.moons)
    }
  }

  private animate() {
    if(!this.scene || !this.camera) return

    this.sun && (this.sun.render().rotation.y += 2 * Math.PI / 1500);
    this.planets.forEach(planet => planet.animate());
    this.asteroidBelt?.animate();
    this.kuiperBelt?.animate();
    MouseController.instance.animate();
    this.renderer?.render(this.scene, this.camera);
    this.orbitControls?.update();
    this.stats?.update();
    Controller.instance.update()
    requestAnimationFrame(this.animate);
  }

  public init(container: HTMLElement) {
    SceneController.instance.init();
    SceneController.instance.createScene('Sun')
    SceneController.instance.selectScene('Sun')
    CameraController.instance.init();
    MouseController.instance.init();
    AudioController.instance.init();

    this.initRenderer(container);

    this.update()
    this.camera = CameraController.instance.camera;

    if(this.renderer && this.camera) {
      this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
      this.orbitControls.update();
    }

    this.stats = Stats();
    container.appendChild(this.stats.dom);
    
    this.initPlanets(planets);

    // Загрузка 3д моделей
    const modelLoader = new GLTFLoader();
    let asteroid = new THREE.Object3D();

    modelLoader.load(asteroidModel, 
      (object3d) => {
        asteroid = object3d.scene;
        const spriteMap = new THREE.TextureLoader().load(asteroidTexture);
        const normalMap = new THREE.TextureLoader().load(asteroidNormalTexture);
        const roughnessMap = new THREE.TextureLoader().load(asteroidRoughnessTexture);
        const material = new THREE.MeshStandardMaterial({
           map: spriteMap, 
           normalMap: normalMap, 
           roughnessMap: roughnessMap, 
           color: 0xffffff 
        });
        const mesh: any = asteroid.children[0];
        mesh.material = material;

        this.asteroidBelt = new AsteroidBelt(asteroid, asteroidBelt);
        this.asteroidBelt.render();

        this.kuiperBelt = new AsteroidBelt(asteroid, kuiperBelt);
        this.kuiperBelt.render();

        this.animate();
      }, 
      (xhr) => console.log('3D model ' + (xhr.loaded / xhr.total * 100 ) + '% loaded'),
      (err) => console.error(err)
    );
  }

}


export default Controller;








