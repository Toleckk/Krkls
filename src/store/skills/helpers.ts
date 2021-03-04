export const adjustByName = <S extends string, T extends {name: S}>(
  name: S,
  fn: (el: T) => T,
  items: T[],
): T[] => items.map(item => (item.name === name ? fn(item) : item))

export const urlToCounts = (str: string): number[] => {
  const nums = str.match(/[0-9a-c]{16}/)?.[0].split('')

  if (!nums) {
    return []
  }

  return nums.map(num => parseInt(num, 13))
}
