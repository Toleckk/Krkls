import {selectHighlight} from '../selectors'
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
})
