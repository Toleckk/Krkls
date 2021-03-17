import {ItemHighlight} from '../../store/highlight'
import {WithHighlight} from '../../store/items'

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

export const groupSkills = <S extends {name: string; group: number}>(skills: S[]): S[][] =>
  Object.values(
    skills.reduce<Record<string, S[]>>(
      (acc, s) => ({
        ...acc,
        [s.group]: acc[s.group] ? acc[s.group].concat(s) : [s],
      }),
      {},
    ),
  )
