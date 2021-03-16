import * as THREE from 'three';
import CelestialBody from './celestial-body';
import { semiminorAxis, getPlanetPosX, getPlanetPosZ, getPlanetRotate } from '../helpers';
import { CameraController } from '../controllers';
import Label from './label'
import { Vector3 } from 'three';

class Planet extends CelestialBody {
  private sphere = null;
  private angle: number = Math.floor(Math.random() * Math.PI * 2);
  private semiminorAxis: number = semiminorAxis(this.semimajorAxis, this.eccentricity);
  private x: number = null;
  private z: number = null;
  private label: Label = null;

  render(): THREE.Object3D {
    const pivot = new THREE.Object3D();
    const geometry = new THREE.SphereGeometry(this.radius, this.wSegments, this.hSegments);
    const spriteMap = new THREE.TextureLoader().load(this.texture);
    const material = new THREE.MeshStandardMaterial({ map: spriteMap, color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0 });
    this.sphere = new THREE.Mesh(geometry, material);
    this.sphere.name = this.name;
    this.sphere.rotation.z = this.tilt * Math.PI / 180;

    // Название планеты
    this.label = new Label(this.name, new Vector3(this.x - 3, this.radius + 7, this.z));
    const labelMesh = this.label.render();

    pivot.rotateZ(this.orbitalInclination * Math.PI / 180);
    pivot.add(this.sphere);
    pivot.add(labelMesh);
    return pivot;
  }

  public animate(): void {
    // Анимация вращения вокруг родительского объекта
    this.x = getPlanetPosX(this.semimajorAxis, this.perihelion, this.angle);
    this.z = getPlanetPosZ(this.semiminorAxis, this.angle);
    this.sphere.position.set(this.x, 0, this.z);
    this.angle -= getPlanetRotate(this.orbitalPeriod, this.retrogradeMotion)

    // Задаем планете вращение вокруг своей оси в каждом кадре
    this.sphere.rotation.y += Math.PI * 2 / this.rotationPeriod;

    // Получение дистанции от камеры до планеты
    const camVector = CameraController.getInstance().getCamera().position;
    const distanceToPlanet = camVector.distanceTo(this.sphere.position);
    
    // Масштабирование и поворот названия планеты
    this.label.animate(distanceToPlanet, new Vector3(this.x, this.radius + 7, this.z));

    // Если планету не видно она светится белым
    if(distanceToPlanet > 1500 && this.radius < 5) {
      this.sphere.material.emissiveIntensity = 100;
    } else {
      this.sphere.material.emissiveIntensity = 0;
    }
  }
  
}

export default Planet;