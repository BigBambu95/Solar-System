import * as THREE from 'three';
import CelestialBody from './celestial-body';
import { semiminorAxis, getPlanetPosX, getPlanetPosZ } from '../helpers';
import { CameraController } from '../controllers';
import fontJson from '../fonts/helvetica.typeface.json';

class Planet extends CelestialBody {
  private sphere = null;
  private label = null;
  private angle: number = Math.floor(Math.random() * Math.PI * 2);
  private semiminorAxis: number = semiminorAxis(this.semimajorAxis, this.eccentricity);
  private x: number = null;
  private z: number = null;

  // Создание названия планеты при первоначальном рендере
  private createLabel() {
    const font = new THREE.Font(fontJson);
    const textGeometry = new THREE.TextGeometry(this.name, { font, size: 3, height: 0.25 });
    const textMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
    this.label = new THREE.Mesh(textGeometry, textMaterial);
  }

  // Метод масштабирования и поворота названия планеты
  private animateLabel(distanceToPlanet: number) {
    this.label.position.set(this.x - 3, this.radius + 7, this.z);
    this.label.scale.set(distanceToPlanet / 350, distanceToPlanet / 350, distanceToPlanet / 350);
    this.label.lookAt(CameraController.getInstance().getCamera().position);
  }

  render(): THREE.Object3D {
    const pivot = new THREE.Object3D();
    const geometry = new THREE.SphereGeometry(this.radius, this.wSegments, this.hSegments);
    const spriteMap = new THREE.TextureLoader().load(this.texture);
    const material = new THREE.MeshStandardMaterial({ map: spriteMap, color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0 });
    this.sphere = new THREE.Mesh(geometry, material);
    this.sphere.name = this.name;
    this.sphere.rotation.z = this.tilt * Math.PI / 180;

    this.createLabel();

    pivot.rotateZ(this.orbitalInclination * Math.PI / 180);
    pivot.add(this.sphere);
    pivot.add(this.label);
    return pivot;
  }

  public animate(): void {
    // Анимация вращения вокруг родительского объекта
    this.x = getPlanetPosX(this.semimajorAxis, this.perihelion, this.angle);
    this.z = getPlanetPosZ(this.semiminorAxis, this.angle);
    this.sphere.position.set(this.x, 0, this.z);

    // Анимация вращения вокруг своей оси
    this.sphere.rotation.y += Math.PI * 2 / this.rotationPeriod;

    // Получение дистанции от камеры до планеты
    const camVector = CameraController.getInstance().getCamera().position;
    const distanceToPlanet = camVector.distanceTo(this.sphere.position);
    
    // Масштабирование и поворот названия планеты
    this.animateLabel(distanceToPlanet);

    // Если планету не видно она светится белым
    if(distanceToPlanet > 1500 && this.radius < 5) {
      this.sphere.material.emissiveIntensity = 100;
    } else {
      this.sphere.material.emissiveIntensity = 0;
    }

    // Ретроградное вращение
    if(this.retrogradeMotion) {
      this.angle -= Math.PI * 2 / this.orbitalPeriod;
    } else {
      this.angle += Math.PI * 2 / this.orbitalPeriod;
    }

  }
  
}

export default Planet;