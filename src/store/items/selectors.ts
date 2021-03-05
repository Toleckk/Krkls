import {Item, Ship} from './types'
import {createSelector} from '@reduxjs/toolkit'
import {selectSkills} from '../skills'
import {availableItems, isDevice, isShip, isWeapon} from './helpers'

export const selectItems = (state: {items: Item[]}) => state.items

export const selectWeapons = createSelector(selectItems, selectSkills, (items, skills) =>
  availableItems(items.filter(isWeapon), skills),
)

export const selectDevices = createSelector(selectItems, selectSkills, (items, skills) =>
  availableItems(items.filter(isDevice), skills),
)

export const selectShips = createSelector(
  selectItems,
  selectSkills,
  (items, skills): Array<Ship & {available: boolean}> =>
    availableItems(items.filter(isShip), skills),
)

export const selectSortedShips = createSelector(selectShips, ships => {
  const countAvailableShips = (ships: Array<Ship & {available: boolean}>) =>
    ships.reduce((sum, ship) => (ship.available ? sum + 1 : sum), 0)

  const obj = ships.reduce(
    (acc, s) => ({...acc, [s.class]: acc[s.class] ? acc[s.class].concat(s) : [s]}),
    {} as Record<string, Array<Ship & {available: boolean}>>,
  )

  obj['Корсар'].push(obj['Корсар МК1'][0])
  delete obj['Корсар МК1']
  return Object.values(obj).sort((a, b) => {
    const countOfA = countAvailableShips(a)
    const countOfB = countAvailableShips(b)

    if (countOfA === countOfB) return a[0].name < b[0].name ? -1 : 1

    if (countOfA < countOfB) return 1

    return -1
  })
})
