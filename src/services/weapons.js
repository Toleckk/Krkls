import React, {createContext, useContext, useMemo} from 'react'
import defaultWeapons from '../data/weapons.json'
import {useAvailable} from './items'

export const WeaponsContext = createContext(null)

export const useWeaponsContext = () => useContext(WeaponsContext)

export const WeaponsContextProvider = ({children}) => {
    const weapons = useAvailable(defaultWeapons)

    const value = useMemo(() => ({weapons}), [weapons])

    return <WeaponsContext.Provider value={value}>{children}</WeaponsContext.Provider>
}
