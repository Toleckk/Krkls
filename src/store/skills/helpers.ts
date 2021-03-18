import {findByProp} from '@krkls/utils'

export const adjustByName = <S extends string, T extends {name: S}>(
  name: S,
  fn: (el: T) => T,
  items: T[],
): T[] => {
  const index = items.findIndex(item => item.name === name)

  if (index === -1) {
    return items
  }

  return [...items.slice(0, index), fn(items[index]), ...items.slice(index + 1)]
}

export const findByName = <S extends string, T extends {name: S}>(
  name: S,
  items: T[],
): T | undefined => findByProp('name', name, items)

export const addSkillsCounts = <T extends {name: string; count: number}>(
  currentSkills: T[],
  minSkills: Array<{name: string; count: number}>,
): T[] =>
  currentSkills.map(skill => {
    const required = findByName(skill.name, minSkills)

    if (required && skill.count < required.count) {
      return {...skill, count: required.count}
    }

    return skill
  })
