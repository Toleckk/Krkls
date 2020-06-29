import React from 'react'
import {useSkillsContext} from '../services/skills'
import styles from './Skills.module.css'

export const Skills = () => {
    const {skills, incrementSkill, decrementSkill, reset} = useSkillsContext()
    const sortedSkill = Object.values(skills.reduce((acc, s) => ({
        ...acc,
        [s.group]: acc[s.group] ? acc[s.group].concat(s) : [s]
    }), {}))

    return (
        <div className={styles.skills}>
            {sortedSkill.map((group, i) => (
                <table key={i}>
                    <tbody>{
                        group.map(({name, count, max}, j) => (
                            <tr key={'' + i + j}>
                                <td>{name}</td>
                                <td>{count}</td>
                                <td>
                                    <button
                                        disabled={count >= max}
                                        onClick={() => incrementSkill(name)}
                                    >
                                        +
                                    </button>
                                </td>
                                <td>
                                    <button
                                        disabled={count <= 0}
                                        onClick={() => decrementSkill(name)}
                                    >
                                        -
                                    </button>
                                </td>
                            </tr>
                        ))
                    }</tbody>
                </table>
            ))}
            <button onClick={reset}>Сбросить</button>
        </div>
    )
}
