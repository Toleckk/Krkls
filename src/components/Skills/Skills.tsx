import React, {Fragment} from 'react'
import {Skill} from '../../ui/Skill'
import {useAction, useAppSelector} from '../../store'
import {actions as skillActions, selectSkills, Skill as TSkill} from '../../store/skills'
import {actions as highlightActions} from '../../store/highlight'
import {WithHighlight} from '../../store/items'
import s from './Skills.module.scss'

export const Skills = () => {
  const skills = useAppSelector(selectSkills)

  const increment = useAction(skillActions.increment)
  const decrement = useAction(skillActions.decrement)

  const highlightSkill = useAction(skill => highlightActions.highlightSkill({skill: skill.name}))
  const resetHighlight = useAction(highlightActions.reset)

  const sortedSkill = Object.values(
    skills.reduce<Record<string, WithHighlight<TSkill>[]>>(
      (acc, s) => ({
        ...acc,
        [s.group]: acc[s.group] ? acc[s.group].concat(s) : [s],
      }),
      {},
    ),
  )

  return (
    <div className={s.skills}>
      {sortedSkill.map((group, i, {length}) => (
        <Fragment key={i}>
          <section className={s.column}>
            {group.map((skill, j) => (
              <Skill
                skill={skill}
                key={'' + i + j}
                onIncrement={increment}
                onDecrement={decrement}
                onMouseEnter={highlightSkill}
                onMouseLeave={resetHighlight}
              />
            ))}
          </section>
          {i < length - 1 && <div className={s.divider} />}
        </Fragment>
      ))}
    </div>
  )
}
