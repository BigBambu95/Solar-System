import * as THREE from 'three';
import { MainController } from '../controllers';
import { SceneController } from '../controllers';
import Asteroid from './asteroid';
import { IBelt } from '../types';

export default class AsteroidBelt {
  private pivot: THREE.Object3D | null = null;
  private asteroids: Array<Asteroid> = []; 
  private angle: number = 0;

  constructor(private asteroid: THREE.Object3D, private data: IBelt) {
    this.asteroid = asteroid;
    this.data = data;
  }

  // Функция создания пояса астероидов
  private createAsteroidBelt(distanceScale: number) {
    const { 
      distanceFromStarMin, distanceFromStarMax, orbitalPeriodMin, 
      orbitalPeriodMax, asteroidCount, asteroidScale 
    } = this.data;

    for(let i = 1; i < asteroidCount; i++) {
      const asteroidClone = this.asteroid.clone();
      const asteroid = new Asteroid(
        asteroidClone, orbitalPeriodMin, orbitalPeriodMax, distanceFromStarMin / distanceScale, 
        distanceFromStarMax / distanceScale, this.angle, asteroidScale
      );
      const asteroidModel = asteroid.render();
      
      if(this.pivot) {
        this.pivot.add(asteroidModel);
        this.asteroids.push(asteroid);
        this.angle += Math.PI * 2 / asteroidCount;
      }
    }
  }

  public render() {
    this.pivot = new THREE.Object3D();
    const distanceScale = MainController.instance.getDistanceScale();
    this.createAsteroidBelt(distanceScale);
    SceneController.instance.currentScene.add(this.pivot);
  }

  animate() {
    this.asteroids.forEach(asteroid => {
      asteroid.animate();
    });
  }
}