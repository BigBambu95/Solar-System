
import earthImg from './textures/earth.jpg';
import marsImg from './textures/mars.jpg';
import mercuryImg from './textures/mercury.jpg';
import venusImg from './textures/venus.jpg';
import jupiterImg from './textures/jupiter.jpg';
import saturnImg from './textures/saturn.jpg';


const planets: Array<ICelestialBody> = [
  {
    id: 1,
    name: 'Earth',
    texture: earthImg,
    radius: 5,
    distanceFromStar: 150,
    orbitalPeriod: 21900,
    tilt: 23,
    rotationPeriod: 60,
    orbitalInclination: 0
  },
  {
    id: 2,
    name: 'Mars',
    texture: marsImg,
    radius: 2.5,
    distanceFromStar: 228,
    orbitalPeriod: 41220,
    tilt: 25,
    rotationPeriod: 60,
    orbitalInclination: 1.85
  },
  {
    id: 3,
    name: 'Mercury',
    texture: mercuryImg,
    radius: 2,
    distanceFromStar: 58,
    orbitalPeriod: 5280,
    tilt: 0,
    rotationPeriod: 3480,
    orbitalInclination: 7
  },
  {
    id: 4,
    name: 'Venus',
    texture: venusImg,
    radius: 5,
    distanceFromStar: 108,
    orbitalPeriod: 13500,
    tilt: 177,
    rotationPeriod: 14580,
    orbitalInclination: 3.39
  },
  {
    id: 5,
    name: 'Jupiter',
    texture: jupiterImg,
    radius: 15,
    distanceFromStar: 750,
    orbitalPeriod: 259740,
    tilt: 3,
    rotationPeriod: 24,
    orbitalInclination: 1.31
  },
  {
    id: 6,
    name: 'Saturn',
    texture: saturnImg,
    radius: 15,
    distanceFromStar: 1430,
    orbitalPeriod: 644820,
    tilt: 26.7,
    rotationPeriod: 27,
    orbitalInclination: 2.49
  },
  {
    id: 7,
    name: 'Ceres',
    texture: mercuryImg,
    radius: 1.5,
    distanceFromStar: 414,
    orbitalPeriod: 3000,
    tilt: 3,
    rotationPeriod: 24,
    orbitalInclination: 10.6
  }
]

export {
  planets
}