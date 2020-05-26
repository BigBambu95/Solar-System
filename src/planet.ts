import * as THREE from 'three';
import CelestialBody from './celestial-body';

class Planet extends CelestialBody {
  pivot = null;
  sphere = null;

  render() {
    this.pivot = new THREE.Object3D();
    const geometry = new THREE.SphereGeometry(this.radius, this.wSegments, this.hSegments);
    const spriteMap = new THREE.TextureLoader().load(this.texture);
    const material = new THREE.MeshBasicMaterial({ map: spriteMap, color: 0xffffff });
    this.sphere = new THREE.Mesh(geometry, material);
    this.sphere.position.x = this.distanceFromStar;
    this.sphere.rotation.z = this.tilt * Math.PI / 180;
    this.pivot.rotation.z = this.orbitalInclination * Math.PI / 180;
    this.pivot.rotation.y = Math.random() * (2 * Math.PI);
    this.pivot.add(this.sphere);
    console.log()
    return this.pivot;
  }

  public animate(): void {
    this.pivot.rotation.y += Math.PI * 2 / this.orbitalPeriod;
    this.sphere.rotation.y += Math.PI * 2 / this.rotationPeriod;
  }
}

export default Planet;