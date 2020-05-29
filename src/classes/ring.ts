import * as THREE from 'three';

export default class Ring {
  constructor() {

  }

  render(): THREE.Mesh {
    const geometry = new THREE.RingGeometry( 1, 5, 32, 3 );
    const material = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } );
    return new THREE.Mesh( geometry, material );
  }
}