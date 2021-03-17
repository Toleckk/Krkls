import {ItemHighlight} from '../../../store/highlight'
import {Skills} from '../../../store/skills'
import {composeRequiredLvl, sumCountField} from '../helpers'

describe('lvls helpers', () => {
  describe('sumCountField', () => {
    it('should return 0 if empty array is given', () => {
      const sum = sumCountField([])
      expect(sum).toBe(0)
    })

    test.each([
      [[{count: 1}, {count: 2}, {count: 2}], 5],
      [[{count: 1}, {count: 2}, {count: 3}], 6],
      [[{count: 0}, {count: 0}, {count: 0}], 0],
      [[{count: 1}, {count: 2}, {count: 1}], 4],
      [[{count: 1}, {count: 2}, {count: 20}], 23],
      [[{count: 1}, {count: 2}, {count: 4}], 7],
    ])('should return counts sum', (list, expected) => {
      const sum = sumCountField(list)
      expect(sum).toBe(expected)
    })
  })

  describe('composeRequiredLvl', () => {
    const skills: Skills[] = [
      [{name: 'skill1', count: 1, group: 0, limit: 10}],
      [
        {name: 'skill1', count: 1, group: 0, limit: 0},
        {name: 'skill2', count: 5, group: 0, limit: 0},
        {name: 'skill3', count: 31, group: 0, limit: 0},
        {name: 'skill4', count: 2, group: 0, limit: 0},
        {name: 'skill5', count: 8, group: 0, limit: 0},
      ],
      [{name: 'skill1', count: 5, group: 0, limit: 0}],
      [{name: 'skill5', count: 0, group: 0, limit: 0}],
    ]

    test.each<ItemHighlight['skills']>([{}, {skill: 1}, {skill2: 3}])(
      'should return 0 if empty list is given',
      highlight => {
        const requiredLvl = composeRequiredLvl([], highlight)

        expect(requiredLvl).toBe(0)
      },
    )

    test.each<Skills>(skills)(
      'should return skills counts sum if empty highlight is empty',
      (...skills) => {
        const requiredLvl = composeRequiredLvl(skills, {})
        expect(requiredLvl).toBe(sumCountField(skills))
      },
    )

    test.each<[Skills, ItemHighlight['skills'], number]>([
      [
        [
          {name: '1', limit: 0, group: 0, count: 0},
          {name: '2', limit: 0, group: 0, count: 5},
          {name: '3', limit: 0, group: 0, count: 3},
        ],
        {
          1: 0,
        },
        8,
      ],
      [
        [
          {name: '1', limit: 0, group: 0, count: 0},
          {name: '2', limit: 0, group: 0, count: 5},
          {name: '3', limit: 0, group: 0, count: 3},
        ],
        {
          2: 3,
        },
        8,
      ],
      [
        [
          {name: '1', limit: 0, group: 0, count: 0},
          {name: '2', limit: 0, group: 0, count: 5},
          {name: '3', limit: 0, group: 0, count: 3},
        ],
        {
          1: 0,
          2: 3,
        },
        8,
      ],
      [
        [
          {name: '1', limit: 0, group: 0, count: 0},
          {name: '2', limit: 0, group: 0, count: 5},
          {name: '3', limit: 0, group: 0, count: 3},
        ],
        {
          1: 0,
          2: 3,
          3: 3,
        },
        8,
      ],
      [
        [
          {name: '1', limit: 0, group: 0, count: 0},
          {name: '2', limit: 0, group: 0, count: 5},
          {name: '3', limit: 0, group: 0, count: 3},
        ],
        {
          1: 1,
        },
        9,
      ],
      [
        [
          {name: '1', limit: 0, group: 0, count: 0},
          {name: '2', limit: 0, group: 0, count: 5},
          {name: '3', limit: 0, group: 0, count: 3},
        ],
        {
          1: 1,
          2: 3,
        },
        9,
      ],
      [
        [
          {name: '1', limit: 0, group: 0, count: 0},
          {name: '2', limit: 0, group: 0, count: 5},
          {name: '3', limit: 0, group: 0, count: 3},
        ],
        {
          1: 1,
          2: 6,
          3: 4,
        },
        11,
      ],
    ])('should compose skills and highlight', (skills, requiredSkills, expected) => {
      const requiredLvl = composeRequiredLvl(skills, requiredSkills)

      expect(requiredLvl).toBe(expected)
    })
  })
})
