import * as THREE from 'three';
import Controller from '../index';
import { SceneController } from '../controllers';
import Asteroid from './asteroid';

export default class AsteroidBelt {
  private asteroid: THREE.Object3D = null;
  private pivot: THREE.Object3D = null;
  private asteroids: Array<Asteroid> = []; 
  private angle: number = 0;
  private data: IBelt;

  constructor(model: THREE.Object3D, data: IBelt) {
    this.asteroid = model;
    this.data = data;
  }

  // Функция создания астероида
  private createAsteroid(data: IBelt, distanceScale: number) {
    const { 
      distanceFromStarMin, distanceFromStarMax, orbitalPeriodMin, 
      orbitalPeriodMax, asteroidCount, asteroidScale 
    } = data;

    for(let i = 1; i < asteroidCount; i++) {
      const asteroidClone = this.asteroid.clone();
      const asteroid = new Asteroid(
        asteroidClone, orbitalPeriodMin, orbitalPeriodMax, distanceFromStarMin / distanceScale, 
        distanceFromStarMax / distanceScale, this.angle, asteroidScale
      );
      const asteroidModel = asteroid.render();
      this.pivot.add(asteroidModel);
      this.asteroids.push(asteroid);
      this.angle += Math.PI * 2 / asteroidCount;
    }
  }

  public render() {
    this.pivot = new THREE.Object3D();
    const distanceScale = Controller.getInstance().getDistanceScale();
    this.createAsteroid(this.data, distanceScale);
    SceneController.getInstance().getScene().add(this.pivot);
  }

  animate() {
    this.asteroids.forEach(asteroid => {
      asteroid.animate();
    });
  }
}