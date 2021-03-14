import {ItemHighlight} from '../highlight'
import {WithHighlight} from '../items'

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
): T | undefined => items.find(item => item.name === name)

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

export const withHighlight = <T extends {name: string; count: number}>(
  skills: T[],
  highlight: ItemHighlight | undefined,
): WithHighlight<T>[] => {
  if (!highlight) {
    return skills
  }

  return skills.map(skill => ({
    ...skill,
    highlight:
      skill.name in highlight.skills
        ? {
            available: highlight.skills[skill.name] <= skill.count,
            value: highlight.skills[skill.name],
          }
        : undefined,
  }))
}
