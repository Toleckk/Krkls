import {newHistory, StateWithHistory} from 'redux-undo'
import arrayShuffle from 'array-shuffle'
import {
  selectDevices,
  selectHighlightedItems,
  selectItems,
  selectSortedShips,
  selectWeapons,
} from '../selectors'
import {Device, Item, Ship, Weapon} from '../types'
import {Skill, Skills} from '../../skills'
import {
  composeItemsHighlight,
  groupShipsByClass,
  sortByAvailableShipsAndName,
  withAvailable,
} from '../helpers'

describe('items selectors', () => {
  const skillFields: Omit<Skill, 'name' | 'count'> = {limit: 12, group: 0}
  const skills: StateWithHistory<Skills> = newHistory(
    [],
    [
      {...skillFields, name: '1', count: 5},
      {...skillFields, name: '2', count: 0},
      {...skillFields, name: '3', count: 1},
    ],
    [],
  )

  const itemFields: Omit<Item, 'name' | 'type' | 'skills'> = {info: {}, image: ''}
  const weapon = {...itemFields, type: 'Оружие' as const, effects: [], bigImage: ''}
  const device = {...itemFields, type: 'Устройства' as const, bigImage: '', effects: []}
  const ship = {...itemFields, class: '', type: 'Корабли' as const, race: ''}
  const weapons: Weapon[] = [
    {...weapon, name: 'weapon1', skills: {'3': 1}},
    {...weapon, name: 'weapon2', skills: {'1': 5, '3': 1}},
    {...weapon, name: 'weapon3', skills: {'1': 6, '3': 1}},
    {...weapon, name: 'weapon4', skills: {'2': 2}},
  ]
  const devices: Device[] = [
    {...device, name: 'device1', skills: {'3': 1}},
    {...device, name: 'device2', skills: {'1': 5, '3': 1}},
    {...device, name: 'device3', skills: {'1': 6, '3': 1}},
    {...device, name: 'device4', skills: {'2': 2}},
  ]
  const ships: Ship[] = [
    {...ship, class: '1', name: 'ship1', skills: {'3': 1}},
    {...ship, class: '2', name: 'ship2', skills: {'1': 5, '3': 1}},
    {...ship, class: 'Корсар МК1', name: 'ship3', skills: {'1': 6, '3': 1}},
    {...ship, class: 'Корсар', name: 'ship4', skills: {'2': 2}},
    {...ship, class: 'Корсар', name: 'ship4', skills: {'2': 2}},
  ]
  const items: Item[] = arrayShuffle([...weapons, ...devices, ...ships])

  describe('selectItems', () => {
    it('should return items', () => {
      const selected = selectItems({items})

      expect(selected).toBe(items)
    })
  })

  describe('selectWeapons', () => {
    it('should return weapons', () => {
      const selected = selectWeapons({items, skills})

      expect(selected.length).toBe(weapons.length)
      expect(selected).toEqual(expect.arrayContaining(weapons.map(expect.objectContaining)))
    })

    it('should return weapons with available field', () => {
      const selected = selectWeapons({items, skills})

      expect(selected).toEqual(expect.arrayContaining(withAvailable(weapons, skills.present)))
    })

    it('should sort weapons by available field', () => {
      const selected = selectWeapons({items, skills})

      expect(
        selected.every((current, i, list) =>
          list.slice(0, i).every(prev => prev.available >= current.available),
        ),
      ).toBe(true)
    })

    it('should not mutate provided value', () => {
      const itemsCopy = [...items]
      selectWeapons({items, skills})
      expect(items).toEqual(itemsCopy)
    })
  })

  describe('selectDevices', () => {
    it('should return devices', () => {
      const selected = selectDevices({items, skills})

      expect(selected.length).toBe(devices.length)
      expect(selected).toEqual(expect.arrayContaining(devices.map(expect.objectContaining)))
    })

    it('should return devices with available field', () => {
      const selected = selectDevices({items, skills})

      expect(selected).toEqual(expect.arrayContaining(withAvailable(devices, skills.present)))
    })

    it('should sort devices by available field', () => {
      const selected = selectDevices({items, skills})

      expect(
        selected.every((current, i, list) =>
          list.slice(0, i).every(prev => prev.available >= current.available),
        ),
      ).toBe(true)
    })

    it('should not mutate provided value', () => {
      const itemsCopy = [...items]
      selectDevices({items, skills})
      expect(items).toEqual(itemsCopy)
    })
  })

  describe('selectSortedShips', () => {
    it('should group ships by class', () => {
      const selected = selectSortedShips({skills, items})

      expect(selected).toEqual(
        expect.arrayContaining(
          groupShipsByClass(ships).map(group =>
            expect.arrayContaining(group.map(expect.objectContaining)),
          ),
        ),
      )
    })

    it('should add available field', () => {
      const selected = selectSortedShips({skills, items})
      const available = withAvailable(ships, skills.present)

      expect(
        selected.flat().every(ship => {
          const expected = available.find(a => a.name === ship.name)
          return !!expected && ship.available === expected.available
        }),
      ).toBe(true)
    })

    it('should sort by available field and name', () => {
      const selected = selectSortedShips({skills, items})
      const expectedOrder = sortByAvailableShipsAndName(
        groupShipsByClass(withAvailable(ships, skills.present)),
      )

      expect(selected).toEqual(expectedOrder)
    })
  })

  describe('selectHighlightedItems', () => {
    const highlight = {}

    it('should return empty object if skill is undefined', () => {
      const selected = selectHighlightedItems({items, highlight})

      expect(selected).toEqual({})
    })

    test.each(skills.present)('should return highlighted items', skill => {
      const selected = selectHighlightedItems({items, highlight: {skill: skill.name}})

      expect(selected).toEqual(composeItemsHighlight(items, skill.name))
    })
  })
})
