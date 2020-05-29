declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.mp3" {
  const value: string;
  export default value;
}

interface IController {
  renderer: THREE.WebGLRenderer | null;
  scene: THREE.Scene | null;
  camera: THREE.Camera | null;
  orbitControls: any;
  distanceScale: number;
  timeScale: number;
  sun: ICelestialBody | null;
  planets: Array<ICelestialBody>;
}

interface ICelestialBody {
  id?: number | string;
  name?: string;
  group: string;
  radius: number;
  wSegments?: number;
  hSegments?: number;
  texture: string;
  distanceFromStar?: number;
  orbitalPeriod?: number;
  tilt?: number;
  rotationPeriod?: number;
  orbitalInclination?: number;
  retrogradeMotion?: boolean;
  semimajorAxis?: number;
  eccentricity?: number;
  perihelion?: number;
  aphelion?: number;
  moons?: Array<ICelestialBody>;
}

interface IOrbit {
  group: string;
  tilt: number;
  semimajorAxis?: number;
  eccentricity?: number;
  perihelion?: number;
  aphelion?: number;
}