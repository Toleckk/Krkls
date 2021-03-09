import {selectHighlight, selectItemHighlight, selectSkillHighlight} from '../selectors'
import {Highlight, ItemHighlight, SkillHighlight} from '../types'

describe('highlight selectors', () => {
  const item: ItemHighlight = {skills: {}}
  const skill: SkillHighlight = 'skill'

  const stores: Array<{highlight: Highlight}> = [
    {highlight: {}},
    {highlight: {item}},
    {highlight: {skill}},
  ]

  describe('selectHighlight', () => {
    test.each(stores)('should return stored highlight', store => {
      const selected = selectHighlight(store)

      expect(selected).toBe(store.highlight)
    })
  })

  describe('selectItemHighlight', () => {
    test.each(stores)('should return stored item highlight', store => {
      const selected = selectItemHighlight(store)

      expect(selected).toBe(store.highlight.item)
    })
  })

  describe('selectSkillHighlight', () => {
    test.each(stores)('should should return stored skill highlight', store => {
      const selected = selectSkillHighlight(store)

      expect(selected).toBe(store.highlight.skill)
    })
  })
})
