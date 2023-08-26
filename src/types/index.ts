export interface IController {
  renderer: THREE.WebGLRenderer | null;
  scene: THREE.Scene | null;
  camera: THREE.Camera | null;
  orbitControls: any;
  distanceScale: number;
  timeScale: number;
  sun: any | null;
  planets: Array<ICelestialBody>;
}

export interface ICelestialBody {
  id?: number | string;
  name: string;
  group: bodiesTypes;
  radius: number;
  wSegments?: number;
  hSegments?: number;
  texture: string;
  distanceFromStar: number;
  orbitalPeriod: number;
  tilt: number;
  rotationPeriod: number;
  orbitalInclination: number;
  semimajorAxis: number;
  eccentricity: number;
  perihelion: number;
  aphelion: number;
  retrogradeMotion?: boolean;
  moons?: Array<ICelestialBody>;
}

export interface IBelt {
  distanceFromStarMin: number;
  distanceFromStarMax: number;
  orbitalPeriodMin: number;
  orbitalPeriodMax: number;
  asteroidCount: number;
  asteroidScale: number;
}

export type bodiesTypes = 'planet' | 'dwarf-planet' | 'star' | 'moon';