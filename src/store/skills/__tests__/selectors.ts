import {selectHighlightedSkills, selectSkills} from '../selectors'
import {newHistory} from 'redux-undo'
import {Skills} from '../types'

describe('skills selectors', () => {
  const skills = newHistory<Skills>([], [], [])

  describe('selectSkills', () => {
    it('should return present skills', () => {
      const selected = selectSkills({skills})

      expect(selected).toBe(skills.present)
    })
  })

  describe('selectHighlightedSkills', () => {
    it('should return empty object if item is not in highlight', () => {
      const selected = selectHighlightedSkills({highlight: {}})

      expect(selected).toEqual({})
    })

    it('should return highlighted skills', () => {
      const skills = {skill: 1}
      const selected = selectHighlightedSkills({highlight: {item: {skills}}})

      expect(selected).toBe(skills)
    })
  })
})
