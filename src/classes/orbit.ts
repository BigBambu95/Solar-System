import * as THREE from 'three';
import { semiminorAxis } from '../helpers';
import { bodiesTypes } from '../types';

// TODO: ВЫНести в константы
const BODIES = {
  'planet': 0x999999 as const, 
  'dwarf-planet': 0xcc8e35 as const,
  'star': 0x999999 as const,
  'moon': 0x999999 as const,
}

class Orbit {
  semiminorAxis = 0

  constructor(
    private group: bodiesTypes, 
    private tilt: number, 
    private perihelion: number, 
    private aphelion: number, 
    private semimajorAxis: number, 
    private eccentricity: number
  ) {
    this.group = group;
    this.tilt = tilt;
    this.perihelion = perihelion;
    this.aphelion = aphelion;
    this.semimajorAxis = semimajorAxis;
    this.eccentricity = eccentricity;
  }

  private getOrbitColor() {
    return BODIES[this.group];
  }

  render() {
    this.semiminorAxis = semiminorAxis(this.semimajorAxis, this.eccentricity);
    const x =  this.semimajorAxis - this.perihelion;
    const y = 0;

    const curve = new THREE.EllipseCurve(
      x,  y,               // aX, aZ
      this.semimajorAxis,  // xRadius
      this.semiminorAxis,  // zRadius
      0,  2 * Math.PI,     // aStartAngle, aEndAngle
      false,               // aClockwise
      0                    // aRotation
    );

    const points = curve.getPoints(100);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: this.getOrbitColor() });
    const ellipse = new THREE.Line(geometry, material);
    ellipse.rotation.x = Math.PI / 2;
    ellipse.rotation.y = this.tilt * Math.PI / 180;
    return ellipse;
  }
}

export default Orbit;