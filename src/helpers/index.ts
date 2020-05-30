export const semiminorAxis = (a: number, e: number) => {
  return a * Math.sqrt(1 - Math.pow(e, 2));
}

export const randomInteger = (min: number, max: number) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}