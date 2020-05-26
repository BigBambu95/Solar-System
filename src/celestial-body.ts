abstract class CelestialBody implements ICelestialBody {
  radius: number;
  wSegments: number;
  hSegments: number;
  texture: string;
  distanceFromStar: number;
  orbitalPeriod: number;
  tilt: number;
  rotationPeriod: number;
  orbitalInclination: number;

  constructor(
    radius: number, wSegments: number, hSegments: number, 
    texture: string, distanceFromStar?: number, orbitalPeriod?: number, 
    tilt?: number, rotationPeriod?: number, orbitalInclination: number = 0
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
  }

  public animate(): void {}
}

export default CelestialBody;