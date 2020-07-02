import React, {createContext, useContext, useState} from 'react'
import {useItems} from './items'

export const HighlightContext = createContext(null)

export const useHighlightContext = () => useContext(HighlightContext)


export const HighlightContextProvider = ({children}) => {
    const [highlightedSkills, setHighlightedSkills] = useState({})
    const [highlightedItems, setHighlightedItems] = useState({})
    const {items} = useItems()

    const highlightSkills = item => setHighlightedSkills(item.skills)

    const resetSkillsHighlight = () => setHighlightedSkills({})

    const highlightItems = skill => setHighlightedItems(items.reduce((acc, item) => {
        const count = item.skills[skill.name]
        return count ? {...acc, [item.name]: {name: skill.name, count}} : acc
    }, {}))

    const resetItemsHighlight = () => setHighlightedItems({})

    const value = {
        highlightItems,
        highlightSkills,
        resetSkillsHighlight,
        resetItemsHighlight,
        highlightedSkills,
        highlightedItems,
    }

    return <HighlightContext.Provider value={value}>{children}</HighlightContext.Provider>
}