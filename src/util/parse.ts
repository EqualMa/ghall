export function tryParseInt(str: string): number {
  const num = parseInt(str, 10);
  return Number.isNaN(num) ? 0 : num;
}
