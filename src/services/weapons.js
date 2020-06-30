import React, {createContext, useContext, useMemo, useState} from 'react'
import defaultWeapons from '../data/weapons.json'
import {useAvailable} from './items'

export const WeaponsContext = createContext(null)

export const useWeaponsContext = () => useContext(WeaponsContext)

export const WeaponsContextProvider = ({children}) => {
    const [weapons, setWeapons] = useState(defaultWeapons)

    const availableWeapons = useAvailable(weapons)

    const value = useMemo(() => ({weapons: availableWeapons, setWeapons}), [availableWeapons, setWeapons])

    return <WeaponsContext.Provider value={value}>{children}</WeaponsContext.Provider>
}
