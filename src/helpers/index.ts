export const semiminorAxis = (a: number, e: number) => {
  return a * Math.sqrt(1 - Math.pow(e, 2));
}