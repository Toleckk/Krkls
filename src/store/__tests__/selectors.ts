import {newHistory} from 'redux-undo'
import {Skills} from '../skills'
import {
  selectHighlight,
  selectItems,
  selectLvls,
  selectPresentSkills,
  selectSkills,
} from '../selectors'
import {Item} from '../items'
import {Highlight} from '../highlight'

describe('selectors', () => {
  describe('selectSkills', () => {
    const skills = newHistory<Skills>([], [], [])
    it('should return skills history', () => {
      const selected = selectSkills({skills})

      expect(selected).toBe(skills)
    })
  })

  describe('selectPresentSkills', () => {
    const skills = newHistory<Skills>([], [], [])
    it('should return present skills', () => {
      const selected = selectPresentSkills({skills})

      expect(selected).toBe(skills.present)
    })
  })

  describe('selectLvls', () => {
    it('should return lvls state', () => {
      const lvls: number[] = []
      const selected = selectLvls({lvls})
      expect(selected).toBe(lvls)
    })
  })

  describe('selectItems', () => {
    it('should return items', () => {
      const items: Item[] = []
      const selected = selectItems({items})

      expect(selected).toBe(items)
    })
  })

  describe('selectHighlight', () => {
    const item = 'item'
    const skill = 'skill'

    const stores: Array<{highlight: Highlight}> = [
      {highlight: {}},
      {highlight: {item}},
      {highlight: {skill}},
    ]

    test.each(stores)('should return stored highlight', store => {
      const selected = selectHighlight(store)

      expect(selected).toBe(store.highlight)
    })
  })
})
