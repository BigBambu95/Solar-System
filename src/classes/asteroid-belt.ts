import * as THREE from 'three';
import { SceneController } from '../controllers';
import { randomInteger } from '../helpers';

export default class AsteroidBelt {
  private asteroidCount: number = 1000;
  private randomGenerationAngle: number = 0;
  private asteroid: THREE.Object3D = null;
  private orbitalPeriod: number = 104025;
  private pivot: THREE.Object3D = null;

  constructor(model: THREE.Object3D) {
    this.asteroid = model;
  }

  init() {
    this.pivot = new THREE.Object3D();

    for(let i = 1; i < this.asteroidCount; i++) {
      const asteroidClone = this.asteroid.clone();
      const asteroidScale = randomInteger(1, 3) / 2750;
      asteroidClone.scale.set(asteroidScale, asteroidScale, asteroidScale);
      asteroidClone.rotation.set(randomInteger(0, 360), randomInteger(0 ,360), randomInteger(0, 360));
      asteroidClone.position.set(randomInteger(110, 180) * Math.cos(this.randomGenerationAngle), randomInteger(-5, 5), randomInteger(110, 180) * Math.sin(this.randomGenerationAngle));
      this.pivot.add(asteroidClone);
      this.randomGenerationAngle += Math.PI * 2 / this.asteroidCount;
    }

    SceneController.getInstance().getScene().add(this.pivot);
  }

  animate() {
    this.pivot.rotation.y -= Math.PI * 2 / this.orbitalPeriod;
  }
}