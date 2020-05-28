import * as THREE from 'three';
import CelestialBody from './celestial-body';
import { semiminorAxis } from '../helpers';

class Planet extends CelestialBody {
  sphere = null;
  angle = Math.floor(Math.random() * Math.PI * 2);
  yAngle = this.orbitalInclination * Math.PI / 180;
  semiminorAxis = semiminorAxis(this.semimajorAxis, this.eccentricity);

  render(): THREE.Object3D {
    const geometry = new THREE.SphereGeometry(this.radius, this.wSegments, this.hSegments);
    const spriteMap = new THREE.TextureLoader().load(this.texture);
    const material = new THREE.MeshBasicMaterial({ map: spriteMap, color: 0xffffff });
    this.sphere = new THREE.Mesh(geometry, material);
    this.sphere.position.x = (this.aphelion - this.perihelion) + this.semimajorAxis * Math.cos(this.angle);
    this.sphere.position.z = this.semiminorAxis * Math.sin(this.angle);
    this.sphere.rotation.z = this.tilt * Math.PI / 180;
    return this.sphere;
  }

  public animate(): void {
    this.sphere.position.x = (this.aphelion - this.perihelion) + this.semimajorAxis * Math.cos(this.angle);
    this.sphere.position.z = this.semiminorAxis * Math.sin(this.angle);
    this.sphere.rotation.y += Math.PI * 2 / this.rotationPeriod;

    if(this.retrogradeMotion) {
      this.angle -= Math.PI * 2 / this.orbitalPeriod;
    } else {
      this.angle += Math.PI * 2 / this.orbitalPeriod;
    }

  }
}

export default Planet;