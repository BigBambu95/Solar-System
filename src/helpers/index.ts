export const semiminorAxis = (a: number, e: number) => {
  return a * Math.sqrt(1 - Math.pow(e, 2));
}

export const randomInteger = (min: number, max: number) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

export const getPlanetPosX = (
  semimajorAxis: number, perihelion: number, angle: number
) => {
  return semimajorAxis - perihelion + semimajorAxis * Math.cos(angle);
}

export const getPlanetPosZ = (
  semiminorAxis: number, angle: number
) => semiminorAxis * Math.sin(angle);


export const getPlanetRotate = (orbitalPeriod: number, retrogradeMotion?: boolean) => {
	const angle = Math.PI * 2 / orbitalPeriod
	return retrogradeMotion ? -angle : angle
}