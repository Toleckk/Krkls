import React, {useCallback, useEffect, useState} from 'react'
import c from 'classnames'
import {useSkillsContext} from '../services/skills'
import {useHighlightContext} from '../services/highlight'
import {Button} from './Button'
import styles from './Skill.module.scss'
import useFocusVisible from '../services/focus'

export const Skill = ({skill}) => {
    const [hovered, setHovered] = useState(false)
    const [focused, setFocused] = useState(false)

    const {incrementSkill, decrementSkill} = useSkillsContext()
    const {highlightItems, resetItemsHighlight, highlightedSkills} = useHighlightContext()
    const {focusVisible, onBlur, onFocus} = useFocusVisible()

    const {count, max, limit, name} = skill
    const required = highlightedSkills[name]

    const onMouseEnter = useCallback(() => {
        highlightItems(skill)
        setHovered(true)
    }, [highlightItems, setHovered, skill])

    const onMouseLeave = useCallback(() => {
        resetItemsHighlight()
        setHovered(false)
    }, [resetItemsHighlight, setHovered])

    useEffect(() => {
        if(focusVisible && !focused) {
            highlightItems(skill)
            setFocused(true)
        } else if(!focusVisible && focused) {
            resetItemsHighlight()
            setFocused(false)
        }
    }, [focusVisible, focused, highlightItems, skill, setFocused, resetItemsHighlight])

    return (
        <div className={styles.skill}
             onMouseEnter={onMouseEnter}
             onMouseLeave={onMouseLeave}
             onFocus={onFocus}
             onBlur={onBlur}
        >
            <span className={c(styles.name, (required || hovered || focused) && styles.required)}>{name}</span>
            <span className={styles.count}>{count}</span>
            <span className={styles.required_count}>
                {(hovered || focused) && max && ('↑' + max)}
                {required && (required > skill.count) && ('+' + (required - skill.count))}
            </span>
            <Button className={styles.button} disabled={count >= limit} onClick={() => incrementSkill(name)} name="increment">
                <span className={styles.sign}>+</span>
            </Button>
            <Button className={styles.button} disabled={count <= 0} onClick={() => decrementSkill(name)} name="decrement">
                <span className={styles.sign}>-</span>
            </Button>
        </div>
    )
}