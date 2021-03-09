import {Available, Device, Item, Ship, Weapon} from './types'
import {Skill} from '../skills'

export const sortByAvailable = <I extends Item>(items: Available<I>[]): Available<I>[] =>
  [...items].sort((a, b) => (a.available === b.available ? 0 : a.available ? -1 : 1))

export const withAvailable = <I extends Item>(items: I[], skills: Skill[]): Available<I>[] =>
  items.map(item => ({
    ...item,
    available: isItemAvailable(item, skills),
  }))

export const isItemAvailable = ({skills: itemSkills}: Item, skills: Skill[]): boolean =>
  skills.every(({count, name}) => !(name in itemSkills) || count >= (itemSkills[name] || 0))

export const isWeapon = (item: Record<string, unknown>): item is Weapon => item.type === 'Оружие'

export const isShip = (item: Record<string, unknown>): item is Ship => item.type === 'Корабли'

export const isDevice = (item: Record<string, unknown>): item is Device =>
  item.type === 'Устройства'

export const countAvailableShips = (ships: Available<Ship>[]) =>
  ships.filter(ship => ship.available).length

export const groupShipsByClass = <T extends Ship>(ships: T[]): T[][] => {
  const group = ships.reduce<Record<string, T[]>>(
    (acc, ship) => ({
      ...acc,
      [ship.class]: acc[ship.class] ? acc[ship.class].concat(ship) : [ship],
    }),
    {},
  )

  if ('Корсар' in group && 'Корсар МК1' in group && group['Корсар МК1'].length) {
    group['Корсар'].push(group['Корсар МК1'][0])
    delete group['Корсар МК1']
  }

  return Object.values(group)
}

export const sortByAvailableShipsAndName = <S extends Available<Ship>>(groups: S[][]): S[][] =>
  [...groups].sort((a, b) => {
    const aCount = countAvailableShips(a)
    const bCount = countAvailableShips(b)

    if (aCount === bCount) {
      return a[0].name < b[0].name ? -1 : 1
    }

    return aCount < bCount ? 1 : -1
  })

export const composeItemsHighlight = (items: Item[], skill: string) =>
  items.reduce<Record<string, number>>((highlight, item) => {
    const count = item.skills[skill]

    if (!count) {
      return highlight
    }

    return {
      ...highlight,
      [item.name]: count,
    }
  }, {})
