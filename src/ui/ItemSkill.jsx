import React, {useState} from 'react'
import c from 'classnames'
import {useSkillsContext} from '../services/skills'
import styles from './ItemSkill.module.scss'

export const ItemSkill = ({skill: {name, count}, setSkill}) => {
    const [active, setActive] = useState(false)
    const toggle = () => setActive(!active)

    const {skills} = useSkillsContext()
    const skill = skills.find(skill => skill.name === name)

    const onClick = () => {
        setSkill(name, active ? 0 : count)
        toggle()
    }

    return (
        <tr>
            <td>{name}:</td>
            <td className={c(styles.count, styles.cell, skill.count < count && styles.error)}>{count}</td>
            <td className={styles.cell}>
                {skill.count < count && (
                    <button onClick={onClick} title="Добавить" className={c(styles.button, active && styles.active)}>
                        {'+' + (count - skill.count)}
                    </button>
                )}
            </td>
        </tr>
    )
}