import * as THREE from 'three';
import CelestialBody from './celestial-body';
import { semiminorAxis, getPlanetPosX, getPlanetPosZ } from '../helpers';
import { CameraController } from '../controllers';

import fontJson from '../fonts/helvetica.typeface.json';

class Planet extends CelestialBody {
  sphere = null;
  label = null;
  light = null;
  angle: number = Math.floor(Math.random() * Math.PI * 2);
  semiminorAxis: number = semiminorAxis(this.semimajorAxis, this.eccentricity);
  x: number = null;
  z: number = null;

  private createLabel() {
    const font = new THREE.Font(fontJson);
    const textGeometry = new THREE.TextGeometry(this.name, { font, size: 3, height: 0.25 });
    const textMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});

    this.label = new THREE.Mesh(textGeometry, textMaterial);
    this.label.position.set(this.x - 5, this.radius + 5, this.z);
    this.label.lookAt(CameraController.getInstance().getCamera().position);
  }

  private animateLabel(distanceToPlanet: number) {
    this.label.position.set(this.x - 5, this.radius + 5, this.z);
    this.label.scale.set(distanceToPlanet / 300, distanceToPlanet / 300, distanceToPlanet / 300);
    this.label.lookAt(CameraController.getInstance().getCamera().position);
  }

  render(): THREE.Object3D {
    const pivot = new THREE.Object3D();
    const geometry = new THREE.SphereGeometry(this.radius, this.wSegments, this.hSegments);
    const spriteMap = new THREE.TextureLoader().load(this.texture);
    const material = new THREE.MeshStandardMaterial({ map: spriteMap, color: 0xffffff });
    this.sphere = new THREE.Mesh(geometry, material);
    this.sphere.name = this.name;
    this.x = getPlanetPosX(this.semimajorAxis, this.perihelion, this.angle);
    this.z = getPlanetPosZ(this.semiminorAxis, this.angle);
    this.sphere.position.set(this.x, 0, this.z);
    this.sphere.rotation.z = this.tilt * Math.PI / 180;

    this.createLabel();

    this.light = new THREE.PointLight(0xffee88, 1, 100, 2);
    // const planetLightGeometry = new THREE.SphereBufferGeometry(0.02, 16, 8);
    // const planetLightMat = new THREE.MeshStandardMaterial({
      // emissive: 0xffffee,
      // emissiveIntensity: 1,
      // color: 0x000000
    // });
    // const planetLightMesh = new THREE.Mesh(planetLightGeometry, planetLightMat);
    this.light.position.set(this.x, 0, this.z);

    pivot.rotateZ(this.orbitalInclination * Math.PI / 180);
    pivot.add(this.sphere);
    pivot.add(this.label);
    pivot.add(this.light);
    return pivot;
  }

  public animate(): void {
    // Анимация вращения вокруг родительского объекта
    this.x = getPlanetPosX(this.semimajorAxis, this.perihelion, this.angle);
    this.z = getPlanetPosZ(this.semiminorAxis, this.angle);
    this.sphere.position.set(this.x, 0, this.z);

    // Анимация вращения вокруг своей оси
    this.sphere.rotation.y += Math.PI * 2 / this.rotationPeriod;

    const camVector = CameraController.getInstance().getCamera().position;
    const distanceToPlanet = camVector.distanceTo(this.sphere.position);

    this.animateLabel(distanceToPlanet);

    if(this.retrogradeMotion) {
      this.angle -= Math.PI * 2 / this.orbitalPeriod;
    } else {
      this.angle += Math.PI * 2 / this.orbitalPeriod;
    }

  }
}

export default Planet;