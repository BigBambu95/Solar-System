import * as THREE from 'three';
import { bodiesTypes } from '../types';

class Star {
  constructor(
    private name: string,
    private group: bodiesTypes,
    private radius: number, 
    private wSegments: number, 
    private hSegments: number, 
    private texture: string
  ) {
    this.radius = radius
    this.wSegments = wSegments
    this.hSegments = hSegments
    this.texture = texture
  }

  render() {
    const geometry = new THREE.SphereGeometry(this.radius, this.wSegments, this.hSegments);
    const spriteMap = new THREE.TextureLoader().load(this.texture);
    const material = new THREE.MeshBasicMaterial({ map: spriteMap });
    const sphere = new THREE.Mesh(geometry, material);
    return sphere;
  }
}

export default Star;