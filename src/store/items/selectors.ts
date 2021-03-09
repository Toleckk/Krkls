import {Item} from './types'
import {createSelector} from '@reduxjs/toolkit'
import {selectSkills} from '../skills'
import {
  composeItemsHighlight,
  groupShipsByClass,
  isDevice,
  isShip,
  isWeapon,
  sortByAvailable,
  sortByAvailableShipsAndName,
  withAvailable,
} from './helpers'
import {selectSkillHighlight} from '../highlight'

export const selectItems = (state: {items: Item[]}) => state.items

export const selectWeapons = createSelector(selectItems, selectSkills, (items, skills) =>
  sortByAvailable(withAvailable(items.filter(isWeapon), skills)),
)

export const selectDevices = createSelector(selectItems, selectSkills, (items, skills) =>
  sortByAvailable(withAvailable(items.filter(isDevice), skills)),
)

export const selectSortedShips = createSelector(selectItems, selectSkills, (items, skills) =>
  sortByAvailableShipsAndName(groupShipsByClass(withAvailable(items.filter(isShip), skills))),
)

export const selectHighlightedItems = createSelector(
  selectItems,
  selectSkillHighlight,
  (items, skill) => {
    if (!skill) {
      return {}
    }

    return composeItemsHighlight(items, skill)
  },
)
