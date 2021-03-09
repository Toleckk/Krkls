import React, {useCallback, useEffect, useState} from 'react'
import c from 'classnames'
import {Button} from './Button'
import styles from './Skill.module.scss'
import useFocusVisible from '../services/focus'
import {useAction, useAppSelector} from '../store'
import {actions as skillsActions, selectHighlightedSkills} from '../store/skills'
import {actions as highlightActions} from '../store/highlight'

export const Skill = ({skill}) => {
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)

  const incrementSkill = useAction(name => skillsActions.increment({name}))
  const decrementSkill = useAction(name => skillsActions.decrement({name}))
  const resetHighlight = useAction(() => highlightActions.reset())
  const highlightedSkills = useAppSelector(selectHighlightedSkills)
  const highlightSkill = useAction(() => highlightActions.highlightSkill({skill: skill.name}))

  const {focusVisible, onBlur, onFocus} = useFocusVisible()

  const {count, max, limit, name} = skill
  const required = highlightedSkills[name]

  const onMouseEnter = useCallback(() => {
    highlightSkill()
    setHovered(true)
  }, [highlightSkill, setHovered])

  const onMouseLeave = useCallback(() => {
    resetHighlight()
    setHovered(false)
  }, [resetHighlight, setHovered])

  useEffect(() => {
    if (focusVisible && !focused) {
      highlightSkill()
      setFocused(true)
    } else if (!focusVisible && focused) {
      resetHighlight()
      setFocused(false)
    }
  }, [focusVisible, focused, highlightSkill, setFocused, resetHighlight])

  return (
    <div
      className={styles.skill}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <span className={c(styles.name, (required || hovered || focused) && styles.required)}>
        {name}
      </span>
      <span className={styles.count}>{count}</span>
      <span className={styles.required_count}>
        {(hovered || focused) && max && '↑' + max}
        {required && required > skill.count && '+' + (required - skill.count)}
      </span>
      <Button
        className={styles.button}
        disabled={count >= limit}
        onClick={() => incrementSkill(name)}
        name="increment"
      >
        <span className={styles.sign}>+</span>
      </Button>
      <Button
        className={styles.button}
        disabled={count <= 0}
        onClick={() => decrementSkill(name)}
        name="decrement"
      >
        <span className={styles.sign}>-</span>
      </Button>
    </div>
  )
}
