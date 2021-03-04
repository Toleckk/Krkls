import React, {createContext, useCallback, useContext, useState} from 'react'
import {useItems} from './items'

export const HighlightContext = createContext(null)

export const useHighlightContext = () => useContext(HighlightContext)

export const HighlightContextProvider = ({children}) => {
  const [highlightedSkills, setHighlightedSkills] = useState({})
  const [highlightedItems, setHighlightedItems] = useState({})
  const {items} = useItems()

  const highlightSkills = useCallback(item => setHighlightedSkills(item.skills), [
    setHighlightedSkills,
  ])

  const resetSkillsHighlight = useCallback(
    () => Object.keys(highlightedSkills).length && setHighlightedSkills({}),
    [highlightedSkills, setHighlightedSkills],
  )

  const highlightItems = useCallback(
    skill =>
      setHighlightedItems(
        items.reduce((acc, item) => {
          const count = item.skills[skill.name]
          return count ? {...acc, [item.name]: {name: skill.name, count}} : acc
        }, {}),
      ),
    [setHighlightedItems, items],
  )

  const resetItemsHighlight = useCallback(
    () => Object.keys(highlightedItems).length && setHighlightedItems({}),
    [highlightedItems, setHighlightedItems],
  )

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
