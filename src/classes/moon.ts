import * as THREE from 'three';
import CelestialBody from './celestial-body';

class Moon extends CelestialBody {
  private sphere: THREE.Mesh | null = null;

  render() {
    const geometry = new THREE.SphereGeometry(this.radius, this.wSegments, this.hSegments);
    const spriteMap = new THREE.TextureLoader().load(this.texture);
    const material = new THREE.MeshBasicMaterial({ map: spriteMap, color: 0xffffff });
    this.sphere = new THREE.Mesh(geometry, material);
    this.sphere.position.x = this.distanceFromStar;
    return this.sphere;
  }
}

export default Moon;