export function getEnumValues<T extends string | number>(e: Record<string, T>): T[] {
  return Object.keys(e).map((key) => e[key]);
}
