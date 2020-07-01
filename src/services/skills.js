import React, {createContext, useCallback, useContext, useMemo, useState} from 'react'

const Skill = (name, group, max, limit = 12) => ({name, group, count: 0, limit, max})

const defaultSkills = [
    Skill('Точность', 0),
    Skill('Уклонение', 0, 7),
    Skill('Наведение', 0, 6),
    Skill('Механика', 1, 8),
    Skill('Биохимия', 1, 8),
    Skill('Кибернетика', 1, 8),
    Skill('Электроника', 1, 8),
    Skill('Пилотирование', 2, 10),
    Skill('Добыча', 2, 5),
    Skill('Торговля', 2, 7),
    Skill('Ремонт', 2, 6),
    Skill('Кинетическое', 3, 5),
    Skill('Энергетическое', 3, 7),
    Skill('Ракетное', 3, 6),
    Skill('Тактика', 4),
    Skill('Контроль', 4),
]

export const SkillsContext = createContext(null)

export const SkillsContextProvider = ({children}) => {
    const [skills, setSkills] = useState(defaultSkills)
    const setSkill = useCallback((name, count) => {
        const i = skills.findIndex(skill => skill.name === name)
        setSkills([
            ...skills.slice(0, i),
            {...skills[i], count: count <= 0 ? 0 : count >= skills[i].limit ? skills[i].limit : count},
            ...skills.slice(i + 1),
        ])
    }, [skills, setSkills])

    const findSkill = useCallback(name => skills.find(skill => skill.name === name), [skills])

    const incrementSkill = useCallback(
        name => setSkill(name, findSkill(name).count + 1),
        [setSkill, findSkill],
    )

    const decrementSkill = useCallback(
        name => setSkill(name, findSkill(name).count - 1),
        [setSkill, findSkill],
    )

    const sum = useMemo(() => skills.reduce((acc, skill) => acc + skill.count, 0), [skills])

    const reset = useCallback(() => setSkills(defaultSkills), [setSkills])

    const isItemAvailable = useCallback(item => {
        const names = Object.keys(item.skills)
        const requiredSkills = skills.filter(s => names.indexOf(s.name) !== -1)
        return requiredSkills.every(s => s.count >= item.skills[s.name])
    }, [skills])

    const addForItem = useCallback(i => {
        const required = Object.keys(i.skills)
        setSkills(skills.map(skill => (
            required.some(name => skill.name === name)
                ? ({...skill, count: Math.max(skill.count, i.skills[skill.name])})
                : skill
        )))
    }, [skills])

    const value = {
        skills,
        setSkills,
        setSkill,
        incrementSkill,
        decrementSkill,
        sum,
        reset,
        isItemAvailable,
        addForItem,
        findSkill,
    }

    return <SkillsContext.Provider value={value}>{children}</SkillsContext.Provider>
}

export const useSkillsContext = () => useContext(SkillsContext)
