import * as THREE from 'three';

class Orbit implements IOrbit {
  radius: number;
  tilt: number;

  constructor(radius: number, tilt: number) {
    this.radius = radius;
    this.tilt = tilt;
  }

  render(): THREE.Line {
    const curve = new THREE.EllipseCurve(
      0,  0,            // ax, aY
      this.radius,      // xRadius
      this.radius,      // yRadius
      0,  2 * Math.PI,  // aStartAngle, aEndAngle
      false,            // aClockwise
      0                 // aRotation
    );

    const points = curve.getPoints( 50 );
    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const material = new THREE.LineBasicMaterial( { color : 0xcccccc } );
    const ellipse = new THREE.Line(geometry, material);
    ellipse.rotation.x = Math.PI / 2;
    ellipse.rotation.y = this.tilt * Math.PI / 180;
    return ellipse;
  }
}

export default Orbit;