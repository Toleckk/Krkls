import React, {createContext, useContext, useMemo, useState} from 'react'
import defaultShips from '../data/ships.json'
import {useAvailable} from './items'


export const ShipsContext = createContext(null)


export const useShipsContext = () => useContext(ShipsContext)


export const ShipsContextProvider = ({children}) => {
    const [ships, setShips] = useState(defaultShips)

    const availableShips = useAvailable(ships)

    const value = useMemo(() => ({ships: availableShips, setShips}), [setShips, availableShips])

    return <ShipsContext.Provider value={value}>{children}</ShipsContext.Provider>
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

        if (countOfA === countOfB)
            return a[0].name < b[0].name ? -1 : 1

        if (countOfA < countOfB)
            return 1

        return -1
    })
}

const countAvailable = ships => ships.reduce((sum, ship) => ship.available ? sum + 1 : sum, 0)