import React, {useCallback, useEffect, useState} from 'react'
import c from 'classnames'
import {Button} from '../Button'
import {Skill as TSkill} from '../../store/skills'
import {useFocusVisible} from '../../contexts/FocusVisible'
import {WithHighlight} from '../../store/items'
import s from './Skill.module.scss'

export type FullSkill = WithHighlight<TSkill>

export type SkillProps = {
  skill: FullSkill
  onIncrement?: (skil: FullSkill) => unknown
  onDecrement?: (skil: FullSkill) => unknown
  onMouseEnter?: (skill: FullSkill) => unknown
  onMouseLeave?: (skill: FullSkill) => unknown
}

export const Skill: React.FC<SkillProps> = React.memo(
  ({skill, onIncrement, onDecrement, onMouseEnter, onMouseLeave}) => {
    const [isHovered, setIsHovered] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    const handleIncrementClick = useCallback(() => onIncrement?.(skill), [onIncrement, skill])
    const handleDecrementClick = useCallback(() => onDecrement?.(skill), [onDecrement, skill])

    const {focusVisible, onBlur, onFocus} = useFocusVisible()

    const handleMouseEnter = useCallback(() => {
      onMouseEnter?.(skill)
      setIsHovered(true)
    }, [onMouseEnter, skill, setIsHovered])

    const handleMouseLeave = useCallback(() => {
      onMouseLeave?.(skill)
      setIsHovered(false)
    }, [onMouseLeave, skill])

    useEffect(() => {
      if (focusVisible && !isFocused) {
        onMouseEnter?.(skill)
        setIsFocused(true)
      } else if (!focusVisible && setIsFocused(false)) {
        onMouseLeave?.(skill)
        setIsFocused(false)
      }
    }, [focusVisible, isFocused, onMouseEnter, onMouseLeave, setIsFocused, skill])

    return (
      <div
        className={s.skill}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        <span className={c(s.name, (!!skill.highlight || isHovered || isFocused) && s.required)}>
          {skill.name}
        </span>
        <span className={s.count}>{skill.count}</span>
        <span className={s.required_count}>
          {(isHovered || isFocused) && skill.max && '↑' + skill.max}
          {!!skill.highlight &&
            !skill.highlight?.available &&
            '+' + (skill.highlight.value - skill.count)}
        </span>
        <Button
          className={s.button}
          disabled={skill.count >= skill.limit}
          onClick={handleIncrementClick}
          name="increment"
        >
          <span className={s.sign}>+</span>
        </Button>
        <Button
          className={s.button}
          disabled={skill.count <= 0}
          onClick={handleDecrementClick}
          name="decrement"
        >
          <span className={s.sign}>-</span>
        </Button>
      </div>
    )
  },
)

Skill.displayName = 'Skill'
