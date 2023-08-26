import { ICelestialBody, bodiesTypes } from "../types";

abstract class CelestialBody implements ICelestialBody {
  constructor(
    public name: string,
    public group: bodiesTypes,
    public radius: number,
    public wSegments: number,
    public hSegments: number,
    public texture: string,
    public distanceFromStar:number,
    public orbitalPeriod: number,
    public rotationPeriod: number, 
    public tilt: number,
    public orbitalInclination: number = 0,
    public semimajorAxis: number, 
    public eccentricity: number,
    public perihelion: number, 
    public aphelion: number,
    public retrogradeMotion?: boolean, 
    public moons?: Array<ICelestialBody>
  ) {
    this.radius = radius;
    this.wSegments = wSegments;
    this.hSegments = hSegments;
    this.texture = texture;
    this.distanceFromStar = distanceFromStar;
    this.orbitalPeriod = orbitalPeriod;
    this.tilt = tilt;
    this.rotationPeriod = rotationPeriod;
    this.orbitalInclination = orbitalInclination;
    this.retrogradeMotion = retrogradeMotion;
    this.semimajorAxis = semimajorAxis;
    this.eccentricity = eccentricity;
    this.perihelion = perihelion;
    this.aphelion = aphelion;
    this.moons = moons;
    this.group = group;
    this.name = name;
  }

  public render(): void {}

  public animate(): void {}
}

export default CelestialBody;