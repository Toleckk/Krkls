import React from 'react'
import c from 'classnames'
import {useSkillsContext} from '../services/skills'
import styles from './ItemSkill.module.scss'

export const ItemSkill = ({skill: {name, count}}) => {
    const {skills, setSkill} = useSkillsContext()
    const skill = skills.find(skill => skill.name === name)

    const addSkill = () => setSkill(name, count)

    return (
        <tr>
            <td>{name}:</td>
            <td className={c(styles.count, styles.cell, skill.count < count && styles.error)}>{count}</td>
            <td className={styles.cell}>
                {skill.count < count && (
                    <button onClick={addSkill} title="Добавить" className={styles.button}>
                        {'+' + (count - skill.count)}
                    </button>
                )}
            </td>
        </tr>
    )
}