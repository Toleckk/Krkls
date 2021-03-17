import {createSelector} from '@reduxjs/toolkit'
import {selectHighlight, selectPresentSkills, selectItems} from '../../store'
import {
  groupByType,
  groupShipsByClass,
  sortByAvailable,
  sortByAvailableShipsAndName,
  withAvailable,
  withHighlight,
} from './helpers'
import {Available, Item, WithHighlight} from '../../store/items'

export const selectSortedItems = createSelector(
  selectItems,
  selectPresentSkills,
  selectHighlight,
  (items, skills, highlight) => {
    const {ships, devices, weapons} = groupByType(items)

    const full = <I extends Item>(items: I[]): WithHighlight<Available<I>>[] =>
      withHighlight(sortByAvailable(withAvailable(items, skills)), skills, highlight.skill)

    return {
      devices: full(devices),
      weapons: full(weapons),
      ships: sortByAvailableShipsAndName(
        groupShipsByClass(withHighlight(withAvailable(ships, skills), skills, highlight.skill)),
      ),
    }
  },
)
