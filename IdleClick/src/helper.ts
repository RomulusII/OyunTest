export function round(x: number, decimals: number): string {
  return Number(
    Math.round(Number(x + "e" + decimals)) + "e-" + decimals
  ).toFixed(decimals);
}

export function round2(x: number): string {
  return round(x, 2);
}

export function round1(x: number): string {
  return round(x, 1);
}
