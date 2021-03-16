import React from 'react'
import {Skills} from '../../components/Skills'
import {useAction, useAppSelector} from '../../store'
import {actions as skillActions, selectSkills, Skill as TSkill} from '../../store/skills'
import {actions as highlightActions} from '../../store/highlight'
import {WithHighlight} from '../../store/items'

export type SkillsContainerProps = any

export const SkillsContainer: React.FC<SkillsContainerProps> = () => {
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
    <Skills
      skills={sortedSkill}
      onIncrement={increment}
      onDecrement={decrement}
      onHighlight={highlightSkill}
      onResetHighlight={resetHighlight}
    />
  )
}
