import React from 'react'
import {useSkillsContext} from '../services/skills'
import styles from './Skills.module.css'
import {Skill} from '../ui/Skill'

export const Skills = () => {
    const {skills, reset} = useSkillsContext()
    const sortedSkill = Object.values(skills.reduce((acc, s) => ({
        ...acc,
        [s.group]: acc[s.group] ? acc[s.group].concat(s) : [s]
    }), {}))

    return (
        <div className={styles.skills}>
            {sortedSkill.map((group, i) => (
                <table key={i}>
                    <tbody>{
                        group.map((skill, j) => <Skill skill={skill} key={'' + i + j}/>)
                    }</tbody>
                </table>
            ))}
            <button onClick={reset}>Сбросить</button>
        </div>
    )
}
