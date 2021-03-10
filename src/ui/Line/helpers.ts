export const restrictPercents = (value: number): number => {
  if (value <= 1) {
    return value * 100
  }

  return Math.min(100, value)
}
