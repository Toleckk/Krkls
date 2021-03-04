import React, {useMemo, useContext, createContext, useState} from 'react'
import {useSkillsContext} from './skills'
import {devices, ships, weapons} from '../data/images'
import devicesData from '../data/devices.json'
import shipsData from '../data/ships.json'
import weaponsData from '../data/weapons.json'

const defaultItems = [
  ...devicesData.map(device => ({
    ...device,
    count: 0,
    type: 'Устройства',
    image: devices['img_' + device.image],
    bigImage: devices['img_' + device.image + '65'],
  })),
  ...weaponsData.map(weapon => ({
    ...weapon,
    count: 0,
    type: 'Оружие',
    image: weapons['img_' + weapon.image],
    bigImage: weapons['img_' + weapon.image + '65'],
  })),
  ...shipsData.map(ship => ({
    ...ship,
    count: 0,
    type: 'Корабли',
    class: ship.name,
    name: `${ship.race} ${ship.name}`,
    image: ships['img_' + ship.image],
    info: {
      ...ship.info,
      'Эффективное ХП': ~~(
        (ship.info['Структура'] * parseInt(ship.info['Щиты'])) / 100 +
        +ship.info['Структура']
      ),
    },
  })),
]

export const ItemsContext = createContext(null)

export const useItems = () => useContext(ItemsContext)

export const ItemsProvider = ({children}) => {
  const [items, setItems] = useState(defaultItems)

  const weapons = useMemo(() => items.filter(item => item.type === 'Оружие'), [items])
  const devices = useMemo(() => items.filter(item => item.type === 'Устройства'), [items])
  const ships = useMemo(() => items.filter(item => item.type === 'Корабли'), [items])

  const availableWeapons = useAvailable(weapons)
  const availableDevices = useAvailable(devices)
  const availableShips = useAvailable(ships)

  const value = useMemo(
    () => ({
      devices: availableDevices,
      weapons: availableWeapons,
      ships: availableShips,
      setItems,
      items,
    }),
    [availableDevices, availableWeapons, availableShips, setItems, items],
  )

  return <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
}

export const useAvailable = items => {
  const {isItemAvailable} = useSkillsContext()

  return useMemo(
    () =>
      items
        .map(item => ({...item, available: isItemAvailable(item)}))
        .sort((a, b) => {
          if (a.available === b.available) return 0
          if (a.available) return -1
          return 1
        }),
    [items, isItemAvailable],
  )
}

export const sortShips = ships => {
  const obj = ships.reduce(
    (acc, s) => ({...acc, [s.class]: acc[s.class] ? acc[s.class].concat(s) : [s]}),
    {},
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
}

const countAvailableShips = ships =>
  ships.reduce((sum, ship) => (ship.available ? sum + 1 : sum), 0)
