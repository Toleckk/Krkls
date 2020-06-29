import React, {createContext, useContext, useMemo} from 'react'
import {useSkillsContext} from './skills'
import defaultShips from '../data/ships.json'


export const ShipsContext = createContext(null)


export const useShipsContext = () => useContext(ShipsContext)


export const ShipsContextProvider = ({children}) => {
    const {skills} = useSkillsContext()

    const ships = useMemo(
        () =>
            defaultShips
                .map(w => {
                    const names = Object.keys(w.skills)
                    const requiredSkills = skills
                        .flat()
                        .filter(s => names.indexOf(s.name) !== -1)

                    return {
                        ...w,
                        available: requiredSkills.every(s => s.count >= w.skills[s.name]),
                    }
                })
                .sort((a, b) => {
                    if (a.available === b.available)
                        return 0
                    if (a.available)
                        return -1
                    return 1
                }),
        [skills],
    )

    const value = useMemo(() => ({ships}), [ships])

    return (
        <ShipsContext.Provider value={value}>{children}</ShipsContext.Provider>
    )
}


export const sortShips = ships => {
    const obj = ships.reduce(
        (acc, s) => ({...acc, [s.name]: acc[s.name] ? acc[s.name].concat(s) : [s]}), {},
    )

    obj['Корсар'].push(obj['Корсар МК1'][0])
    delete obj['Корсар МК1']
    return Object.values(obj).sort((a, b) => {
        const countOfA = countAvailable(a)
        const countOfB = countAvailable(b)

        if(countOfA === countOfB)
            return a[0].name < b[0].name ? -1 : 1

        if(countOfA < countOfB)
            return 1

        return -1
    })
}

const countAvailable = ships => ships.reduce((sum, ship) => ship.available ? sum + 1 : sum, 0)