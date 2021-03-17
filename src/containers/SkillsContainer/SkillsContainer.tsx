import React from 'react'
import {Skills} from '../../components/Skills'
import {useAction, useAppSelector} from '../../store'
import {actions as skillActions} from '../../store/skills'
import {actions as highlightActions} from '../../store/highlight'
import {selectGroupedSkills} from './selectors'

export type SkillsContainerProps = any

export const SkillsContainer: React.FC<SkillsContainerProps> = () => {
  const skills = useAppSelector(selectGroupedSkills)

  const increment = useAction(skillActions.increment)
  const decrement = useAction(skillActions.decrement)

  const highlightSkill = useAction(skill => highlightActions.highlightSkill({skill: skill.name}))
  const resetHighlight = useAction(highlightActions.reset)

  return (
    <Skills
      skills={skills}
      onIncrement={increment}
      onDecrement={decrement}
      onHighlight={highlightSkill}
      onResetHighlight={resetHighlight}
    />
  )
}
