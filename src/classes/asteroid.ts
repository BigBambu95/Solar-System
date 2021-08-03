import { randomInteger } from '../helpers';

export default class Asteroid {
  private randomDistanceFromStar = 0
  private randomOrbitalPeriod = 0
  
  constructor(
    private object: THREE.Object3D, 
    private orbitalPeriodMin: number, 
    private orbitalPeriodMax: number, 
    private distanceFromStarMin: number, 
    private distanceFromStarMax: number, 
    private angle: number, 
    private scale: number
  ) {
    this.object = object;
    this.orbitalPeriodMin = orbitalPeriodMin;
    this.orbitalPeriodMax = orbitalPeriodMax;
    this.distanceFromStarMin = distanceFromStarMin;
    this.distanceFromStarMax = distanceFromStarMax;
    this.angle = angle;
    this.scale = scale;
  }

  public render(): THREE.Object3D {
    this.randomDistanceFromStar = randomInteger(this.distanceFromStarMin, this.distanceFromStarMax);
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