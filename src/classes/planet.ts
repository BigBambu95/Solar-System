import * as THREE from 'three';
import CelestialBody from './celestial-body';
import { semiminorAxis } from '../helpers';
import { CameraController, SceneController } from '../controllers';

import fontJson from '../fonts/helvetica.typeface.json';

class Planet extends CelestialBody {
  sphere = null;
  label = null;
  angle = Math.floor(Math.random() * Math.PI * 2);
  semiminorAxis = semiminorAxis(this.semimajorAxis, this.eccentricity);

  render(): THREE.Object3D {
    const pivot = new THREE.Object3D();
    const font = new THREE.Font(fontJson);
    const geometry = new THREE.SphereGeometry(this.radius, this.wSegments, this.hSegments);
    const spriteMap = new THREE.TextureLoader().load(this.texture);
    const material = new THREE.MeshStandardMaterial({ map: spriteMap, color: 0xffffff });
    this.sphere = new THREE.Mesh(geometry, material);
    this.sphere.name = this.name;
    const x = (this.semimajorAxis - this.perihelion) + this.semimajorAxis * Math.cos(this.angle);
    const z = this.semiminorAxis * Math.sin(this.angle);
    this.sphere.position.x = x;
    this.sphere.position.z = z;
    this.sphere.rotation.z = this.tilt * Math.PI / 180;

    
    const textGeometry = new THREE.TextGeometry(this.name, {
      font: font,
      size: 3,
      height: 0.25
    });

    const textMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});

    this.label = new THREE.Mesh(textGeometry, textMaterial);
    this.label.position.set(x - 5, this.radius + 5, z);
    this.label.lookAt(CameraController.getInstance().getCamera().position);

    pivot.rotateZ(this.orbitalInclination * Math.PI / 180);
    pivot.add(this.sphere);
    pivot.add(this.label);
    return pivot;
  }

  public animate(): void {
    const x = (this.semimajorAxis - this.perihelion) + this.semimajorAxis * Math.cos(this.angle);
    const z = this.semiminorAxis * Math.sin(this.angle);

    this.sphere.position.x = x;
    this.sphere.position.z = z;
    this.sphere.rotation.y += Math.PI * 2 / this.rotationPeriod;

    this.label.position.x = x - 5;
    this.label.position.z = z;
    this.label.lookAt(CameraController.getInstance().getCamera().position);

    if(this.retrogradeMotion) {
      this.angle -= Math.PI * 2 / this.orbitalPeriod;
    } else {
      this.angle += Math.PI * 2 / this.orbitalPeriod;
    }

  }
}

export default Planet;