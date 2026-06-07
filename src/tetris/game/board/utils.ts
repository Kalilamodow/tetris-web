// exclusoive of max
export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function randomChoice<T>(arr: T[]) {
  const index = random(0, arr.length);
  return arr[index];
}
