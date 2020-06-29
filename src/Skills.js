import React from 'react'
import {useSkillsContext} from './services/skills'
import styles from './Skills.module.css'

export const Skills = () => {
    const {skills, incrementSkill, decrementSkill, reset} = useSkillsContext()

    return (
        <div className={styles.skills}>
            {skills.map((category, i) => (
                <table key={i}>
                    <tbody>
                    {category.map(({name, count}, j) => (
                        <tr key={'' + i + j}>
                            <td>{name}</td>
                            <td>{count || 0}</td>
                            <td>
                                <button
                                    disabled={count >= 12}
                                    onClick={() => incrementSkill(i, j)}
                                >
                                    +
                                </button>
                            </td>
                            <td>
                                <button
                                    disabled={!count || count <= 0}
                                    onClick={() => decrementSkill(i, j)}
                                >
                                    -
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ))}
            <button onClick={reset}>Сбросить</button>
        </div>
    )
}
