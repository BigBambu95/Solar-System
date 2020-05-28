
import earthImg from '../textures/earth.jpg';
import marsImg from '../textures/mars.jpg';
import mercuryImg from '../textures/mercury.jpg';
import venusImg from '../textures/venus.jpg';
import jupiterImg from '../textures/jupiter.jpg';
import saturnImg from '../textures/saturn.jpg';
import uranusImg from '../textures/uranus.jpg';
import neptuneImg from '../textures/neptune.jpg';

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
    orbitalInclination: 0,
    semimajorAxis: 149,
    eccentricity: 0.01671123,
    perihelion: 147,
    aphelion: 152
  },
  {
    id: 2,
    name: 'Mercury',
    texture: mercuryImg,
    radius: 2,
    distanceFromStar: 58,
    orbitalPeriod: 5280,
    tilt: 2,
    rotationPeriod: 3480,
    orbitalInclination: 7,
    semimajorAxis: 58,
    eccentricity: 0.20563593,
    perihelion: 46,
    aphelion: 69.8
  },
  {
    id: 3,
    name: 'Mars',
    texture: marsImg,
    radius: 2.5,
    distanceFromStar: 227,
    orbitalPeriod: 41160,
    tilt: 25,
    rotationPeriod: 60,
    orbitalInclination: 1.85,
    semimajorAxis: 227,
    eccentricity: 0.0933941,
    perihelion: 206,
    aphelion: 249
  },
  {
    id: 4,
    name: 'Venus',
    texture: venusImg,
    radius: 5,
    distanceFromStar: 108,
    orbitalPeriod: 13500,
    tilt: 177.36,
    rotationPeriod: 14580,
    orbitalInclination: 3.4,
    semimajorAxis: 108.2,
    eccentricity: 0.0068,
    perihelion: 107.5,
    aphelion: 109,
    retrogradeMotion: true
  },
  {
    id: 5,
    name: 'Jupiter',
    texture: jupiterImg,
    radius: 15,
    distanceFromStar: 778,
    orbitalPeriod: 259956,
    tilt: 3.13,
    rotationPeriod: 24,
    orbitalInclination: 1.3,
    semimajorAxis: 778,
    eccentricity: 0.048775,
    perihelion: 740,
    aphelion: 816
  },
  {
    id: 6,
    name: 'Saturn',
    texture: saturnImg,
    radius: 12.5,
    distanceFromStar: 1429,
    orbitalPeriod: 645540,
    tilt: 26.73,
    rotationPeriod: 26,
    orbitalInclination: 2.48,
    semimajorAxis: 1429,
    eccentricity: 0.055723219,
    perihelion: 1353,
    aphelion: 1513
  },
  {
    id: 9,
    name: 'Ceres',
    texture: mercuryImg,
    radius: 1.5,
    distanceFromStar: 413,
    orbitalPeriod: 100800,
    tilt: 3,
    rotationPeriod: 24,
    orbitalInclination: 10.5,
    semimajorAxis: 413,
    eccentricity: 0.07934,
    perihelion: 381,
    aphelion: 446.5
  }

]

export {
  planets
}