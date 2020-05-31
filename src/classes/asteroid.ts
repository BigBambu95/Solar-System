import { randomInteger } from '../helpers';

export default class Asteroid {
  private object: THREE.Object3D;
  private scale: number;
  private distanceFromStarMin: number;
  private distancefromStarMax: number;
  private orbitalPeriodMin: number;
  private orbitalPeriodMax: number;

  private randomDistanceFromStar: number;
  private randomOrbitalPeriod: number;
  private angle: number = 0;

  constructor(object: THREE.Object3D, orbitalPeriodMin: number, orbitalPeriodMax: number, distanceFromStarMin: number, distanceFromStarMax: number, angle: number, scale: number) {
    this.object = object;
    this.orbitalPeriodMin = orbitalPeriodMin;
    this.orbitalPeriodMax = orbitalPeriodMax;
    this.distanceFromStarMin = distanceFromStarMin;
    this.distancefromStarMax = distanceFromStarMax;
    this.angle = angle;
    this.scale = scale;
  }

  public render(): THREE.Object3D {
    this.randomDistanceFromStar = randomInteger(this.distanceFromStarMin, this.distancefromStarMax);
    this.randomOrbitalPeriod = randomInteger(this.orbitalPeriodMin, this.orbitalPeriodMax);
    const scale = randomInteger(1, 3) / this.scale;
    this.object.scale.set(scale, scale, scale);
    this.object.rotation.set(randomInteger(0, 360), randomInteger(0 ,360), randomInteger(0, 360));
    this.object.position.set(this.randomDistanceFromStar * Math.cos(this.angle), randomInteger(-5, 5), this.randomDistanceFromStar * Math.sin(this.angle));

    return this.object;
  }

  public animate(): void {
    this.object.position.x = this.randomDistanceFromStar * Math.cos(this.angle);
    this.object.position.z = this.randomDistanceFromStar * Math.sin(this.angle);
    this.object.rotation.y += 2 * Math.PI / 360;

    this.angle += Math.PI * 2 / this.randomOrbitalPeriod;
  }
}