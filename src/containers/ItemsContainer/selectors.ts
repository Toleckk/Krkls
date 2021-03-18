import {createSelector} from '@reduxjs/toolkit'
import {selectHighlight, selectPresentSkills, selectItems} from '@krkls/store'
import {Available, Item, WithHighlight} from '@krkls/store/items'
import {
  groupByType,
  groupShipsByClass,
  sortByAvailable,
  sortByAvailableShipsAndName,
  withAvailable,
  withHighlight,
} from './helpers'

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
