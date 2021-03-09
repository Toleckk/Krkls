import arrayShuffle from 'array-shuffle'
import {
  composeItemsHighlight,
  countAvailableShips,
  groupShipsByClass,
  isDevice,
  isItemAvailable,
  isShip,
  isWeapon,
  sortByAvailable,
  sortByAvailableShipsAndName,
  withAvailable,
} from '../helpers'
import {Available, Device, Item, Ship, Weapon} from '../types'
import {Skill} from '../../skills'

describe('items helpers', () => {
  const itemFields: Omit<Item, 'type'> = {
    skills: {},
    info: {},
    image: '',
    name: '',
  }
  const weapon: Weapon = {
    ...itemFields,
    bigImage: '',
    effects: [],
    type: 'Оружие',
  }
  const device: Device = {
    ...itemFields,
    bigImage: '',
    effects: [],
    type: 'Устройства',
  }
  const ship: Ship = {
    ...itemFields,
    race: '',
    class: '',
    type: 'Корабли',
  }

  const skillFields: Omit<Skill, 'count' | 'name'> = {
    limit: 12,
    group: 0,
  }
  const skills: Array<Skill> = [
    {
      ...skillFields,
      name: 'max',
      count: 12,
    },
    {
      ...skillFields,
      name: 'min',
      count: 0,
    },
    {
      ...skillFields,
      name: 'absent',
      count: 0,
    },
  ]

  const availableItems: Item[] = [
    {...weapon, skills: {max: 5}},
    {...weapon, skills: {max: 12}},
    {...weapon, skills: {min: 0}},
  ]
  const unavailableItems: Item[] = [
    {...weapon, skills: {max: 13}},
    {...weapon, skills: {min: 1}},
    {...weapon, skills: {min: 1}},
  ]
  const items: Item[] = [...availableItems, ...unavailableItems]

  describe('isDevice', () => {
    it('should return true if arg is a device', () => {
      const result = isDevice(device)
      expect(result).toBe(true)
    })

    test.each([weapon, ship])('should return false if arg is not a device', item => {
      const result = isDevice(item)
      expect(result).toBe(false)
    })
  })

  describe('isShip', () => {
    it('should return true if arg is a ship', () => {
      const result = isShip(ship)
      expect(result).toBe(true)
    })

    test.each([weapon, device])('should return false if arg is not a ship', item => {
      const result = isShip(item)
      expect(result).toBe(false)
    })
  })

  describe('isWeapon', () => {
    it('should return true if arg is a weapon', () => {
      const result = isWeapon(weapon)
      expect(result).toBe(true)
    })

    test.each([ship, device])('should return false if arg is not a weapon', item => {
      const result = isWeapon(item)
      expect(result).toBe(false)
    })
  })

  describe('isItemAvailable', () => {
    test.each(availableItems)('should return true if item is available', item => {
      const result = isItemAvailable(item, skills)
      expect(result).toBe(true)
    })

    test.each(unavailableItems)('should return false if item is unavailable', item => {
      const result = isItemAvailable(item, skills)
      expect(result).toBe(false)
    })
  })

  describe('withAvailable', () => {
    it('should add available field to provided items', () => {
      const items = withAvailable([...availableItems, ...unavailableItems], skills)

      expect(items).toEqual([
        ...availableItems.map(item => ({...item, available: true})),
        ...unavailableItems.map(item => ({...item, available: false})),
      ])
    })
  })

  describe('sortByAvailable', () => {
    const available = availableItems.map(item => ({...item, available: true}))
    const unavailable = unavailableItems.map(item => ({...item, available: false}))
    const order = [...available, ...unavailable]

    it('should sort descending by available field', () => {
      for (let i = 0; i < 10; ++i) {
        const result = sortByAvailable(arrayShuffle(order))

        expect(
          result.every((cur, i, arr) =>
            arr.slice(0, i).every(prev => prev.available >= cur.available),
          ),
        ).toBe(true)
      }
    })

    it('should not mutate original value', () => {
      for (let i = 0; i < 10; ++i) {
        const items = arrayShuffle(order)
        const itemsCopy = [...items]
        sortByAvailable(itemsCopy)
        expect(itemsCopy).toEqual(items)
      }
    })
  })

  describe('countAvailableShips', () => {
    it('should count available ships', () => {
      const ships = Array(20)
        .fill(ship)
        .map((ship, i) => ({...ship, available: i % 2}))

      const count = countAvailableShips(ships)

      expect(count).toBe(10)
    })
  })

  describe('groupShipsByClass', () => {
    it("should group ships by it's class", () => {
      const ships: Ship[] = [
        {...ship, class: 'first'},
        {...ship, class: 'first'},
        {...ship, class: 'second'},
        {...ship, class: 'first'},
        {...ship, class: 'second'},
        {...ship, class: 'third'},
      ]

      const groupsCount = new Set(ships.map(ship => ship.class)).size
      expect.assertions(groupsCount * 2)

      const grouped = groupShipsByClass(ships)

      for (const group of grouped) {
        const currentGroup = ships.filter(ship => ship.class === group[0].class)

        expect(group).toEqual(expect.arrayContaining(currentGroup))
        expect(currentGroup).toEqual(expect.arrayContaining(group))
      }
    })

    it('should group Корсар МК1 with Корсар group', () => {
      const ships: Ship[] = [
        {...ship, class: 'Корсар'},
        {...ship, class: 'Корсар'},
        {...ship, class: 'Корсар МК1'},
      ]

      const grouped = groupShipsByClass(ships)
      expect(grouped).toEqual([expect.arrayContaining(ships)])
      expect(ships).toEqual(expect.arrayContaining(grouped[0]))
    })
  })

  describe('sortByAvailableShipsAndName', () => {
    const order: Available<Ship>[][] = [
      [
        {...ship, name: '2', available: true},
        {...ship, name: '2', available: true},
        {...ship, name: '2', available: true},
        {...ship, name: '2', available: true},
        {...ship, name: '2', available: true},
        {...ship, name: '2', available: true},
        {...ship, name: '2', available: true},
      ],
      [
        {...ship, name: '0', available: true},
        {...ship, name: '0', available: true},
        {...ship, name: '0', available: false},
        {...ship, name: '0', available: true},
      ],
      [
        {...ship, name: '1', available: true},
        {...ship, name: '1', available: false},
        {...ship, name: '1', available: true},
      ],
    ]

    it('should sort descending by available ships', () => {
      for (let i = 0; i < 10; ++i) {
        const groups = arrayShuffle(order)
        const sorted = sortByAvailableShipsAndName(groups)
        expect(sorted).toEqual(order)
      }
    })

    it('should sort by name if available count is equal', () => {
      const order: Available<Ship>[][] = [
        [
          {...ship, available: true, name: '0'},
          {...ship, available: false, name: '0'},
          {...ship, available: true, name: '0'},
          {...ship, available: true, name: '0'},
          {...ship, available: true, name: '0'},
          {...ship, available: true, name: '0'},
        ],
        [
          {...ship, available: true, name: '1'},
          {...ship, available: false, name: '1'},
          {...ship, available: true, name: '1'},
          {...ship, available: false, name: '1'},
          {...ship, available: true, name: '1'},
          {...ship, available: true, name: '1'},
        ],
        [
          {...ship, available: true, name: '2'},
          {...ship, available: false, name: '2'},
          {...ship, available: true, name: '2'},
          {...ship, available: false, name: '2'},
          {...ship, available: true, name: '2'},
          {...ship, available: true, name: '2'},
        ],
      ]

      for (let i = 0; i < 10; ++i) {
        const groups = arrayShuffle(order)
        const sorted = sortByAvailableShipsAndName(groups)

        expect(sorted).toEqual(order)
      }
    })

    it('should not mutate original value', () => {
      for (let i = 0; i < 10; ++i) {
        const shuffled = arrayShuffle(order)
        const shuffledCopy = [...shuffled]
        sortByAvailableShipsAndName(shuffledCopy)

        expect(shuffledCopy).toEqual(shuffled)
      }
    })
  })

  describe('composeItemsHighlight', () => {
    const highlightItemFields = {
      ...itemFields,
      type: 'Устройства' as const,
      effects: [],
      bigImage: '',
    }
    const highlightItems: Item[] = [
      {...highlightItemFields, name: '0', skills: {min: 10, max: 1}},
      {...highlightItemFields, name: '1', skills: {min: 1}},
      {...highlightItemFields, name: '2', skills: {min: 2}},
      {...highlightItemFields, name: '3', skills: {max: 3}},
      {...highlightItemFields, name: '4', skills: {max: 1}},
      {...highlightItemFields, name: '5', skills: {min: 2, max: 4}},
      {...highlightItemFields, name: '6', skills: {min: 1}},
      {...highlightItemFields, name: '7', skills: {max: 1}},
      {...highlightItemFields, name: '8', skills: {min: 6, max: 1}},
    ]
    const maxHighlight = {
      0: 1,
      3: 3,
      4: 1,
      5: 4,
      7: 1,
      8: 1,
    }
    const minHighlight = {
      0: 10,
      1: 1,
      2: 2,
      5: 2,
      6: 1,
      8: 6,
    }

    it('should return empty object if there is no items with provided skill', () => {
      const highlight = composeItemsHighlight(items, 'absent')

      expect(highlight).toEqual({})
    })

    test.each([
      ['min', minHighlight],
      ['max', maxHighlight],
    ])('should return valid highlight', (skill, itemHighlight) => {
      const highlight = composeItemsHighlight(highlightItems, skill)

      expect(highlight).toEqual(itemHighlight)
    })
  })
})
