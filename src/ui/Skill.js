import React, {useState} from 'react'
import classNames from 'classnames'
import {useSkillsContext} from '../services/skills'
import {useHighlight} from '../services/highlight'
import {Button} from './Button'
import styles from './Skill.module.css'

export const Skill = ({skill}) => {
    const [hovered, setHovered] = useState(false)
    const {incrementSkill, decrementSkill} = useSkillsContext()
    const {highlightItems, resetItemsHighlight} = useHighlight()

    const {required, count, max, limit, name} = skill

    const onMouseEnter = () => {
        highlightItems(skill)
        setHovered(true)
    }

    const onMouseLeave = () => {
        resetItemsHighlight()
        setHovered(false)
    }

    return (
        <div tabIndex="0"
             className={styles.skill}
             onMouseEnter={onMouseEnter}
             onMouseLeave={onMouseLeave}
             onFocus={onMouseEnter}
             onBlur={onMouseLeave}
        >
            <span className={classNames(styles.name, {[styles.required]: required || hovered})}>{name}</span>
            <span className={styles.count}>{count}</span>
            <span className={styles.required_count}>
                {hovered && max && ('↑' + max)}
                {required && (required.count > skill.count) && ('+' + (required.count - skill.count))}
            </span>
            <Button className={styles.button} disabled={count >= limit} onClick={() => incrementSkill(name)}>
                <span className={styles.sign}>+</span>
            </Button>
            <Button className={styles.button} disabled={count <= 0} onClick={() => decrementSkill(name)}>
                <span className={styles.sign}>-</span>
            </Button>
        </div>
    )
}