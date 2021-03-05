import type {WeaponData} from '../../data/weapons.json'
import type {DeviceData} from '../../data/devices.json'
import type {ShipData} from '../../data/ships.json'

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
