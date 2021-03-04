import {Device, Item, Ship, Weapon} from './types'
import {Skill} from '../skills'

export const availableItems = <I extends Item>(
  items: I[],
  skills: Skill[],
): Array<I & {available: boolean}> => {
  const isItemAvailable = (item: Item) =>
    skills.every(
      skill => !(skill.name in item.skills) || skill.count >= (item.skills[skill.name] || 0),
    )

  return items
    .map(item => ({...item, available: isItemAvailable(item)}))
    .sort((a, b) => {
      if (a.available === b.available) return 0
      if (a.available) return -1
      return 1
    })
}

export const isWeapon = (item: Item): item is Weapon => item.type === 'Оружие'

export const isShip = (item: Item): item is Ship => item.type === 'Корабли'

export const isDevice = (item: Item): item is Device => item.type === 'Устройства'
