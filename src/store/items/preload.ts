import defaultDevicesData, {DeviceData} from '../../data/devices.json'
import defaultWeaponsData, {WeaponData} from '../../data/weapons.json'
import defaultShipsData, {ShipData} from '../../data/ships.json'
import * as defaultImages from '../../data/images'
import {Device, Item, Ship, Weapon} from './types'

export const getDefaultItems = (
  devicesData: DeviceData[] = defaultDevicesData,
  weaponsData: WeaponData[] = defaultWeaponsData,
  shipsData: ShipData[] = defaultShipsData,
  images = defaultImages,
): Item[] => [
  ...devicesData.map<Device>(device => ({
    ...device,
    count: 0,
    type: 'Устройства',
    image: images.devices[`img_${device.image}`],
    bigImage: images.devices[`img_${device.image}65`],
  })),
  ...weaponsData.map<Weapon>(weapon => ({
    ...weapon,
    count: 0,
    type: 'Оружие',
    image: images.weapons[`img_${weapon.image}`],
    bigImage: images.weapons[`img_${weapon.image}65`],
  })),
  ...shipsData.map<Ship>(ship => ({
    ...ship,
    count: 0,
    type: 'Корабли',
    class: ship.name,
    name: `${ship.race} ${ship.name}`,
    image: images.ships[`img_${ship.image}`],
    info: {
      ...ship.info,
      'Эффективное ХП': ~~(
        (Number(ship.info['Структура']) * parseInt(String(ship.info['Щиты']))) / 100 +
        Number(ship.info['Структура'])
      ),
    },
  })),
]
