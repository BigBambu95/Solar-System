import * as THREE from 'three';
import CelestialBody from './celestial-body';

class Star extends CelestialBody {
  render(): THREE.Mesh {
    const geometry = new THREE.SphereGeometry(this.radius, this.wSegments, this.hSegments);
    const spriteMap = new THREE.TextureLoader().load(this.texture);
    const material = new THREE.MeshBasicMaterial({ map: spriteMap });
    const sphere = new THREE.Mesh(geometry, material);
    return sphere;
  }
}

export default Star;