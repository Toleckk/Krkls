import {WithHighlight} from '../../store/items'

export const withHighlight = <T extends {name: string; count: number}>(
  skills: T[],
  required: Record<string, number> | undefined,
): WithHighlight<T>[] => {
  if (!required) {
    return skills
  }

  return skills.map(skill => ({
    ...skill,
    highlight:
      skill.name in required
        ? {
            available: required[skill.name] <= skill.count,
            value: required[skill.name],
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
