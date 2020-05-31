
import earthImg from '../textures/earth.jpg';
import marsImg from '../textures/mars.jpg';
import mercuryImg from '../textures/mercury.jpg';
import venusImg from '../textures/venus.jpg';
import jupiterImg from '../textures/jupiter.jpg';
import saturnImg from '../textures/saturn.jpg';
import uranusImg from '../textures/uranus.jpg';
import neptuneImg from '../textures/neptune.jpg';
import moonImg from '../textures/moon.jpg';
import plutoImg from '../textures/pluto.jpg';
import makemakeImg from '../textures/makemake.jpg';

const planets: Array<ICelestialBody> = [
  {
    id: 1,
    name: 'Earth',
    group: 'planet',
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
    group: 'planet',
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
    group: 'planet',
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
    group: 'planet',
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
    group: 'planet',
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
    aphelion: 816,
    moons: [
      {
        id: 1,
        name: 'Ganymede',
        group: 'moon',
        texture: moonImg,
        radius: 2,
        distanceFromStar: 1 + 15,
        orbitalPeriod: 420,
        tilt: 0,
        rotationPeriod: 0,
        orbitalInclination: 0.2,
        semimajorAxis: 1 + 15,
        eccentricity: 0.0013,
        perihelion: 1 + 15,
        aphelion: 1 + 15
      }
    ]
  },
  {
    id: 6,
    name: 'Saturn',
    group: 'planet',
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
    id: 7,
    name: 'Uranus',
    group: 'planet',
    texture: uranusImg,
    radius: 7.5,
    distanceFromStar: 2876,
    orbitalPeriod: 1841100,
    tilt: 97.77,
    rotationPeriod: 42,
    orbitalInclination: 0.77,
    semimajorAxis: 2876,
    eccentricity: 0.044405586,
    perihelion: 2748,
    aphelion: 3004,
    retrogradeMotion: true
  },
  {
    id: 8,
    name: 'Neptune',
    group: 'planet',
    texture: neptuneImg,
    radius: 7.5,
    distanceFromStar: 4503,
    orbitalPeriod: 3611400,
    tilt: 28.32,
    rotationPeriod: 40,
    orbitalInclination: 1.76,
    semimajorAxis: 4503,
    eccentricity: 0.011214269,
    perihelion: 4452,
    aphelion: 4553
  },
  {
    id: 9,
    name: 'Pluto',
    group: 'dwarf-planet',
    texture: plutoImg,
    radius: 2,
    distanceFromStar: 5906,
    orbitalPeriod: 5433180,
    tilt: 119.6,
    rotationPeriod: 360,
    orbitalInclination: 17.14,
    semimajorAxis: 5906,
    eccentricity: 0.2488273,
    perihelion: 4400,
    aphelion: 7400,
    retrogradeMotion: true
  },
  {
    id: 10,
    name: 'Ceres',
    group: 'dwarf-planet',
    texture: mercuryImg,
    radius: 2,
    distanceFromStar: 413,
    orbitalPeriod: 100800,
    tilt: 3,
    rotationPeriod: 24,
    orbitalInclination: 10.5,
    semimajorAxis: 413,
    eccentricity: 0.07934,
    perihelion: 381,
    aphelion: 446.5
  },
  {
    id: 11,
    name: 'Eris',
    group: 'dwarf-planet',
    texture: mercuryImg,
    radius: 2,
    distanceFromStar: 10180,
    orbitalPeriod: 12229800,
    tilt: 0,
    rotationPeriod: 65,
    orbitalInclination: 44,
    semimajorAxis: 10180,
    eccentricity: 0.44068,
    perihelion: 5750,
    aphelion: 14610
  },
  {
    id: 12,
    name: 'Makemake',
    group: 'dwarf-planet',
    texture: makemakeImg,
    radius: 2,
    distanceFromStar: 6800,
    orbitalPeriod: 6701400,
    tilt: 0,
    rotationPeriod: 19.25,
    orbitalInclination: 29,
    semimajorAxis: 6800,
    eccentricity: 0.16254481,
    perihelion: 5690,
    aphelion: 7900
  },
  {
    id: 13,
    name: 'Quawar',
    group: 'dwarf-planet',
    texture: mercuryImg,
    radius: 2,
    distanceFromStar: 6496,
    orbitalPeriod: 6263400,
    tilt: 0,
    rotationPeriod: 30,
    orbitalInclination: 8,
    semimajorAxis: 6496,
    eccentricity: 0.035127279663,
    perihelion: 6300,
    aphelion: 6735
  }
]

const asteroidBelt = {
  distanceFromStarMin: 330,
  distanceFromStarMax: 540,
  orbitalPeriodMin: 76650,
  orbitalPeriodMax: 131400,
  asteroidCount: 1000,
  asteroidScale: 2750
}

const kuiperBelt = {
  distanceFromStarMin: 4500,
  distanceFromStarMax: 8250,
  orbitalPeriodMin: 5433180,
  orbitalPeriodMax: 12229800,
  asteroidCount: 2000,
  asteroidScale: 750
}

export {
  planets,
  asteroidBelt,
  kuiperBelt
}