import React from 'react'
import {useSkillsContext} from '../services/skills'
import {getExperience} from '../services/lvl'


export const Lvl = () => {
    const {sum} = useSkillsContext()
    const exp = getExperience(sum)

    return (
        <>
            <span>Уровень: {sum}</span>
            <br/>
            <span>Опыт: {exp}</span>
        </>
    )
}
