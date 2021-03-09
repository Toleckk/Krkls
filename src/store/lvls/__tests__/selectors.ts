import {selectCurrentLvl, selectLvls, selectRequiredLvl} from '../selectors'
import {newHistory} from 'redux-undo'
import {Skills} from '../../skills'
import {Lvls} from '../types'
import {composeRequiredLvl, sumCountField} from '../helpers'
import {ItemsHighlight} from '../../highlight'

describe('lvls selectors', () => {
  const skills = newHistory<Skills>(
    [],
    Array(15)
      .fill({limit: 0, group: 0})
      .map((e, i) => ({
        ...e,
        name: String(i),
        count: Math.round(Math.random() * 12),
      })),
    [],
  )
  const lvls: Lvls = Array(500)
    .fill(0)
    .map((_, i) => i * 10)

  describe('selectLvls', () => {
    it('should return lvls state', () => {
      const selected = selectLvls({lvls})
      expect(selected).toBe(lvls)
    })
  })

  describe('selectCurrentLvl', () => {
    it('should return skills count sum', () => {
      const selected = selectCurrentLvl({skills, lvls})

      expect(selected.lvl).toBe(sumCountField(skills.present))
    })

    it('should return exp for selected lvl', () => {
      const selected = selectCurrentLvl({skills, lvls})

      expect(selected.exp).toBe(lvls[selected.lvl])
    })
  })

  describe('selectRequiredLvl', () => {
    const highlights = Array(10)
      .fill(0)
      .map<ItemsHighlight>(() =>
        Array(Math.round(Math.random() * (skills.present.length - 5)) + 5)
          .fill(0)
          .reduce<ItemsHighlight>(
            (acc, _, cur) => ({
              item: {
                ...acc.item,
                skills: {...acc.item.skills, [cur]: Math.round(Math.random() * 12)},
              },
            }),
            {item: {skills: {}}},
          ),
      )

    test.each(highlights)('should return required skills count sum', highlight => {
      const selected = selectRequiredLvl({skills, lvls, highlight})

      expect(selected.lvl).toBe(composeRequiredLvl(skills.present, highlight.item.skills))
    })

    test.each(highlights)('should return exp for selected lvl', highlight => {
      const selected = selectRequiredLvl({skills, lvls, highlight})

      expect(selected.exp).toBe(lvls[selected.lvl])
    })
  })
})
