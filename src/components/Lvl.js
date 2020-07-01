import React, {useMemo} from 'react'
import {useSkillsContext} from '../services/skills'
import {getExperience} from '../services/lvl'


export const Lvl = () => {
    const {sum, skills} = useSkillsContext()

    const requiredLvl = useMemo(() => (
        skills
            .filter(skill => skill.required)
            .map(({required, count}) => required.count > count ? required.count - count : 0)
            .reduce((acc, cur) => acc + cur, 0) 
        || undefined
    ), [skills])

    const exp = getExperience(sum)
    const requiredExp = getExperience(requiredLvl + sum)

    return (
        <div>
            <span>Уровень: {sum}</span>
            <span style={{color: 'green'}}>{requiredLvl && (' +' + requiredLvl)}</span>
            <br/>
            <span>Опыт: {exp}</span>
            <span style={{color: 'green'}}>{requiredLvl && (' +' + (requiredExp - exp))}</span>
        </div>
    )
}
