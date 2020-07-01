import React, {createContext, useCallback, useContext, useMemo} from 'react'
import {useLocation, useHistory} from 'react-router'

const Skill = (name, group, max, limit = 12) => ({name, group, count: 0, limit, max})


export const defaultSkills = [
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


export const useSkillsContext = () => useContext(SkillsContext)


export const SkillsContextProvider = ({children}) => {
    const history = useHistory()
    const {pathname} = useLocation()

    const setSkills = useCallback(skills => history.push(skillsToPath(skills)), [history])

    const skills = useMemo(() => pathToSkills(pathname), [pathname])


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


const skillsToPath = skills => skills.map(skill => skill.count.toString(13)).join('')


const pathToSkills = path => path
    .substr(1)
    .split('')
    .map((e, i) => ({...defaultSkills[i], count: parseInt(e, 13)}))
    .concat(defaultSkills.slice(path.length - 1))