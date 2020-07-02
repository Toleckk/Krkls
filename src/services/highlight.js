import React, {useContext, createContext, useState} from 'react'
import {useShipsContext} from './ships'
import {useDevicesContext} from './devices'
import {useWeaponsContext} from './weapons'

export const HighlightContext = createContext(null)

export const useHighlightContext = () => useContext(HighlightContext)


const addRequiredToItem = skill => item => ({
    ...item,
    required: item.skills[skill.name] ? {name: skill.name, count: item.skills[skill.name]} : undefined,
})


const removeRequiredFromItem = item => item.required ? ({...item, required: undefined}) : item


export const HighlightContextProvider = ({children}) => {
    const [highlightedSkills, setHighlightedSkills] = useState({})
    const {ships, setShips} = useShipsContext()
    const {devices, setDevices} = useDevicesContext()
    const {weapons, setWeapons} = useWeaponsContext()

    const highlightSkills = item => setHighlightedSkills(item.skills)

    const resetSkillsHighlight = () => setHighlightedSkills({})

    const highlightItems = skill => {
        const add = addRequiredToItem(skill)
        setShips(ships.map(add))
        setDevices(devices.map(add))
        setWeapons(weapons.map(add))
    }

    const resetItemsHighlight = () => {
        setShips(ships.map(removeRequiredFromItem))
        setWeapons(weapons.map(removeRequiredFromItem))
        setDevices(devices.map(removeRequiredFromItem))
    }

    const value = {highlightItems, highlightSkills, resetSkillsHighlight, resetItemsHighlight, highlightedSkills}

    return <HighlightContext.Provider value={value}>{children}</HighlightContext.Provider>
}