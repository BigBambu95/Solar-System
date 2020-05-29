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
  retrogradeMotion: boolean;
  semimajorAxis: number;
  eccentricity: number;
  perihelion: number;
  aphelion: number;
  moons: Array<ICelestialBody>;

  constructor(
    radius: number, wSegments: number, hSegments: number, 
    texture: string, distanceFromStar?: number, orbitalPeriod?: number, 
    tilt?: number, rotationPeriod?: number, orbitalInclination: number = 0,
    retrogradeMotion?: boolean, semimajorAxis?: number, eccentricity?: number,
    perihelion?: number, aphelion?: number, moons?: Array<ICelestialBody>
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
  }

  public animate(): void {}
}

export default CelestialBody;