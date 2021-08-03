import * as THREE from 'three'
import { Vector3 } from 'three';
import CameraController from '../controllers/camera-controller'
import fontJson from '../fonts/helvetica.typeface.json';

class Label {
  private mesh: THREE.Mesh | null = null;

  constructor(
    private text: string, 
    private position: Vector3
  ) {
    this.text = text;
    this.position = position;
  }

  render() {
    const font = new THREE.Font(fontJson);
    const textGeometry = new THREE.TextGeometry(this.text, { font, size: 3, height: 0.25 });
    const textMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
    this.mesh = new THREE.Mesh(textGeometry, textMaterial);
    this.mesh.position.set(this.position.x, this.position.y, this.position.z)
    return this.mesh;
  }

  animate(distanceToPlanet: number, position: Vector3) {
    if(!this.mesh) return
    
    this.mesh.position.set(position.x, position.y, position.z)
    this.mesh.scale.set(distanceToPlanet / 350, distanceToPlanet / 350, distanceToPlanet / 350);
    this.mesh.lookAt(CameraController.instance.getCamera().position);
  }
}

export default Label