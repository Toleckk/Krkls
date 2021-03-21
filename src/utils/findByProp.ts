export const findByProp = <T, P extends keyof T>(
  prop: P,
  value: T[P] | undefined | null,
  list: T[],
): T | undefined => list.find(el => el[prop] === value)
