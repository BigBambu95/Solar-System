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

export function throttle(f: any, ms: number) {
	let isThrottled = false,
	savedArgs,
	savedThis;

	function wrapper() {
		if(isThrottled) {
			savedArgs = arguments;
			savedThis = this;
			return null;
		}

		f.apply(this, arguments);

		isThrottled = true;

		setTimeout(() => {
			isThrottled = false;
			if(savedArgs) {
				wrapper.apply(savedThis, savedArgs);
				savedArgs = savedThis = null;
			}
		}, ms);

	}

	return wrapper;
}
