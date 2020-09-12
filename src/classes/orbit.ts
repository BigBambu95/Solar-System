import * as THREE from 'three';
import { semiminorAxis } from '../helpers';

class Orbit implements IOrbit {
  group: bodiesTypes;
  tilt: number;
  perihelion: number;
  aphelion: number;
  semimajorAxis: number;
  semiminorAxis: number;
  eccentricity: number;
  color: string;

  constructor(
    group: bodiesTypes, tilt: number, perihelion: number, 
    aphelion: number, semimajorAxis: number, eccentricity: number
  ) {
    this.group = group;
    this.tilt = tilt;
    this.perihelion = perihelion;
    this.aphelion = aphelion;
    this.semimajorAxis = semimajorAxis;
    this.eccentricity = eccentricity;
  }

  private getOrbitColor(): number {
    const bodies = {
      'planet': 0x999999, 
      'dwarf-planet': 0xcc8e35
    }

    return bodies[this.group];
  }

  render(): THREE.Line {
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

    const points = curve.getPoints( 100 );
    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const material = new THREE.LineBasicMaterial( { color: this.getOrbitColor() } );
    const ellipse = new THREE.Line(geometry, material);
    ellipse.rotation.x = Math.PI / 2;
    ellipse.rotation.y = this.tilt * Math.PI / 180;
    return ellipse;
  }
}

export default Orbit;