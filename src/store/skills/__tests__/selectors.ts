import {selectPresentSkills, selectSkills} from '../selectors'
import {newHistory} from 'redux-undo'
import {Skills} from '../types'

describe('skills selectors', () => {
  const skills = newHistory<Skills>([], [], [])

  describe('selectSkills', () => {
    it('should return skills history', () => {
      const selected = selectSkills({skills})

      expect(selected).toBe(skills)
    })
  })

  describe('selectPresentSkills', () => {
    it('should return present skills', () => {
      const selected = selectPresentSkills({skills})

      expect(selected).toBe(skills.present)
    })
  })
})
