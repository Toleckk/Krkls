import React, {Fragment} from 'react'
import {Skill} from '../../ui/Skill'
import {useAction, useAppSelector} from '../../store'
import {actions as skillActions, selectSkills, Skill as TSkill} from '../../store/skills'
import {actions as highlightActions} from '../../store/highlight'
import {WithHighlight} from '../../store/items'
import s from './Skills.module.scss'
import {Divider} from '../../ui/Divider'
import {useMedia} from 'use-media'

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

  const isTablet = useMedia({minWidth: 768})

  return (
    <div className={s.skills}>
      {sortedSkill.map((group, i, {length}) => (
        <Fragment key={i}>
          <ul className={s.column}>
            {group.map((skill, j) => (
              <li>
                <Skill
                  skill={skill}
                  key={'' + i + j}
                  onIncrement={increment}
                  onDecrement={decrement}
                  onMouseEnter={highlightSkill}
                  onMouseLeave={resetHighlight}
                />
              </li>
            ))}
          </ul>
          {i < length - 1 && (
            <div className={s.column}>
              <Divider className={s.divider} vertical={isTablet} />
            </div>
          )}
        </Fragment>
      ))}
    </div>
  )
}
