import devicesData from '../../data/devices.json'
import {Device, Ship, Weapon} from './types'
import {devices, ships, weapons} from '../../data/images'
import weaponsData from '../../data/weapons.json'
import shipsData from '../../data/ships.json'

export const getDefaultItems = () => [
  ...devicesData.map<Device>(device => ({
    ...device,
    count: 0,
    type: 'Устройства',
    image: devices[`img_${device.image}`],
    bigImage: devices[`img_${device.image}65`],
  })),
  ...weaponsData.map<Weapon>(weapon => ({
    ...weapon,
    count: 0,
    type: 'Оружие',
    image: weapons[`img_${weapon.image}`],
    bigImage: weapons[`img_${weapon.image}65`],
  })),
  ...shipsData.map<Ship>(ship => ({
    ...ship,
    count: 0,
    type: 'Корабли',
    class: ship.name,
    name: `${ship.race} ${ship.name}`,
    image: ships[`img_${ship.image}`],
    info: {
      ...ship.info,
      'Эффективное ХП': ~~(
        (+ship.info['Структура'] * parseInt(String(ship.info['Щиты']))) / 100 +
        +ship.info['Структура']
      ),
    },
  })),
]
