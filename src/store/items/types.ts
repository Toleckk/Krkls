import type {WeaponData} from '@krkls/data/weapons.json'
import type {DeviceData} from '@krkls/data/devices.json'
import type {ShipData} from '@krkls/data/ships.json'

export type ItemType = 'Устройства' | 'Оружие' | 'Корабли'

export type Weapon = WeaponData & {
  type: 'Оружие'
  bigImage: string
}

export type Device = DeviceData & {
  type: 'Устройства'
  bigImage: string
}

export type Ship = ShipData & {
  type: 'Корабли'
  class: string
}

export type Item = Device | Ship | Weapon

export type Items = Item[]

export type Available<T extends Item> = T & {available: boolean}

export type WithHighlight<I> = I & {
  highlight?: {
    value: number
    available: boolean
  }
}
