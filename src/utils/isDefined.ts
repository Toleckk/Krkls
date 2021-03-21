export const isDefined = <T extends undefined | null | any>(
  e: T,
): e is Exclude<T, undefined | null> => !!e
