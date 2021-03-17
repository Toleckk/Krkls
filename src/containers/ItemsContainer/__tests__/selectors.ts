import {newHistory, StateWithHistory} from 'redux-undo'
import arrayShuffle from 'array-shuffle'
import {Skill, Skills} from '../../../store/skills'
import {Device, Item, Ship, Weapon} from '../../../store/items'
import {selectSortedItems} from '../selectors'
import {groupShipsByClass} from '../helpers'

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

  it('should return items grouped by type', () => {
    const selected = selectSortedItems({
      items,
      skills,
      highlight: {},
    })

    expect(selected).toEqual(
      expect.objectContaining({
        weapons: expect.arrayContaining(weapons.map(expect.objectContaining)),
        devices: expect.arrayContaining(devices.map(expect.objectContaining)),
        ships: expect.arrayContaining(
          groupShipsByClass(ships).map(group =>
            expect.arrayContaining(group.map(expect.objectContaining)),
          ),
        ),
      }),
    )
  })
})
