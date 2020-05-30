import * as THREE from 'three';
import { SceneController } from '../controllers';
import Asteroid from './asteroid';

export default class AsteroidBelt {
  private asteroidCount: number = 1000;
  private asteroid: THREE.Object3D = null;
  private pivot: THREE.Object3D = null;
  private asteroids: Array<Asteroid> = []; 
  private angle: number = 0;

  constructor(model: THREE.Object3D) {
    this.asteroid = model;
  }

  public render() {
    this.pivot = new THREE.Object3D();

    for(let i = 1; i < this.asteroidCount; i++) {
      const asteroidClone = this.asteroid.clone();
      const asteroid = new Asteroid(asteroidClone, 76650, 131400, 110, 180, this.angle);
      const asteroidModel = asteroid.render();
      this.pivot.add(asteroidModel);
      this.asteroids.push(asteroid);
      this.angle += Math.PI * 2 / this.asteroidCount;
    }

    SceneController.getInstance().getScene().add(this.pivot);
    console.log(this.asteroids);
  }

  animate() {
    this.asteroids.forEach(asteroid => {
      asteroid.animate();
    });
  }
}