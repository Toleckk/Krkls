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
  withHighlight,
} from './helpers'
import {selectSkillHighlight} from '../highlight'

export const selectItems = (state: {items: Item[]}) => state.items

export const selectWeapons = createSelector(
  selectItems,
  selectSkills,
  selectSkillHighlight,
  (items, skills, highlight) =>
    withHighlight(
      sortByAvailable(withAvailable(items.filter(isWeapon), skills)),
      skills,
      highlight,
    ),
)

export const selectDevices = createSelector(
  selectItems,
  selectSkills,
  selectSkillHighlight,
  (items, skills, highlight) =>
    withHighlight(
      sortByAvailable(withAvailable(items.filter(isDevice), skills)),
      skills,
      highlight,
    ),
)

export const selectSortedShips = createSelector(
  selectItems,
  selectSkills,
  selectSkillHighlight,
  (items, skills, highlight) =>
    sortByAvailableShipsAndName(
      groupShipsByClass(
        withHighlight(withAvailable(items.filter(isShip), skills), skills, highlight),
      ),
    ),
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
