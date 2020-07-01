import React from 'react'
import {useSkillsContext} from '../services/skills'
import {Skill} from '../ui/Skill'
import styles from './Skills.module.css'

export const Skills = () => {
    const {skills} = useSkillsContext()
    const sortedSkill = Object.values(skills.reduce((acc, s) => ({
        ...acc,
        [s.group]: acc[s.group] ? acc[s.group].concat(s) : [s],
    }), {}))

    return (
        <div className={styles.skills}>{
            sortedSkill.map((group, i, {length}) => (
                <>
                    <section key={i} className={styles.column}>{
                        group.map((skill, j) => <Skill skill={skill} key={'' + i + j}/>)
                    }</section>
                    {(i < length - 1) && <div className={styles.divider} key={'divider' + i}/>}
                </>
            ))}
        </div>
    )
}
