import React, {createContext, useCallback, useContext, useMemo, useRef} from 'react'
import {useLocation, useHistory} from 'react-router'
import jsonSkills from '../data/skills.json'

export const defaultSkills = jsonSkills.map(skill => ({...skill, count: 0}))


export const SkillsContext = createContext(null)

export const useSkillsContext = () => useContext(SkillsContext)

export const SkillsContextProvider = ({children}) => {
    const history = useHistory()
    const {pathname} = useLocation()

    const skillsRef = useRef(null)

    const setSkills = useCallback(skills => {
        skillsRef.current = skills
        const path = skillsToPath(skills)
        if(path !== pathname.substr(1))
            history.push(path)
    }, [history, pathname, skillsRef])

    const skills = useMemo(() => {
        if(skillsRef.current) {
            const skills = skillsRef.current
            skillsRef.current = null
            return skills
        }
        return pathToSkills(pathname)
    }, [pathname, skillsRef])


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

    const addSkills = useCallback(minSkills => setSkills(skills.map(skill => {
        const minSkill = minSkills.find(minSkill => minSkill.name === skill.name)
        return minSkill && minSkill.count > skill.count ? {...skill, count: minSkill.count} : skill
    })), [skills, setSkills])

    const addForItem = useCallback(
        item => addSkills(Object.keys(item.skills).map(name => ({name, count: item.skills[name]}))),
        [addSkills]
    )


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