import * as THREE from 'three'
import CameraController from '../controllers/camera-controller'
import fontJson from '../fonts/helvetica.typeface.json';

class Label {
  private label: THREE.Mesh;
  private text: string;
  private x: number;
  private y: number;
  private z: number;

  constructor(text: string, x: number, y: number, z: number) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.z = z;
  }

  render() {
    const font = new THREE.Font(fontJson);
    const textGeometry = new THREE.TextGeometry(this.text, { font, size: 3, height: 0.25 });
    const textMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
    this.label = new THREE.Mesh(textGeometry, textMaterial);
    return this.label;
  }

  animate(distanceToPlanet: number) {
    this.label.position.set(this.x, this.y, this.z);
    this.label.scale.set(distanceToPlanet / 350, distanceToPlanet / 350, distanceToPlanet / 350);
    this.label.lookAt(CameraController.getInstance().getCamera().position);
  }
}

export default Label