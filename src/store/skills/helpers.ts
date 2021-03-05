export const adjustByName = <S extends string, T extends {name: S}>(
  name: S,
  fn: (el: T) => T,
  items: T[],
): T[] => items.map(item => (item.name === name ? fn(item) : item))
