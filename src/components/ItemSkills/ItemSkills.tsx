import React, {useCallback, useMemo, useState} from 'react'
import c from 'classnames'
import s from './ItemSkills.module.scss'

export type ItemSkillsProps = {
  skills: Array<{name: string; required: number; count: number}>
  onAddClick?: (skills: Array<{name: string; count: number}>) => unknown
}

export const ItemSkills: React.FC<ItemSkillsProps> = ({skills, onAddClick}) => {
  const [active, setActive] = useState<string[]>([])

  const addingSkills = useMemo(
    () => (active.length ? active.map(name => skills.find(skill => skill.name === name)!) : skills),
    [skills, active],
  )

  const toggleActive = (skill: string) =>
    setActive(
      active.includes(skill) ? active.filter(active => active !== skill) : active.concat(skill),
    )

  const handleAddClick = useCallback(
    () => onAddClick?.(addingSkills.map(({name, required}) => ({name, count: required}))),
    [addingSkills, onAddClick],
  )

  const addingCount = addingSkills.reduce(
    (sum, skill) => sum + Math.max(0, skill.required - skill.count),
    0,
  )

  return (
    <div className={s.skills}>
      <table className={s.table}>
        <tbody>
          {skills.map(skill => (
            <tr key={skill.name}>
              <td>{skill.name}:</td>
              <td className={c(s.count, s.cell, skill.count < skill.required && s.error)}>
                {skill.required}
              </td>
              <td className={s.cell}>
                {skill.count < skill.required && (
                  <button
                    onClick={() => toggleActive(skill.name)}
                    title="Добавить"
                    className={c(s.button, active.includes(skill.name) && s.active)}
                  >
                    {'+' + (skill.required - skill.count)}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {addingCount > 0 && (
        <button className={s.apply} onClick={handleAddClick} title="Добавить">
          +{addingCount}
        </button>
      )}
    </div>
  )
}
