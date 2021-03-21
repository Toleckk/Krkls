import * as actions from '../actions'
import {createSkillsReducer} from '../reducer'
import {Skills} from '../types'
import {addSkillsCounts} from '../helpers'

describe('skills reducer', () => {
  const skillFields = {limit: 12, group: 0}
  const notExistingName = 'not existing name'
  const zeroSkill = {count: 0, name: 'zero', ...skillFields}
  const limitSkill = {count: 12, name: 'limit', ...skillFields}
  const middleSkills: Skills = [
    {count: 1, name: '1', ...skillFields},
    {count: 5, name: '2', ...skillFields},
    {count: 2, name: '3', ...skillFields},
    {count: 10, name: '5', ...skillFields},
    {count: 11, name: '6', ...skillFields},
  ]

  const initialState: Skills = []
  const reducer = createSkillsReducer(initialState)

  describe('reset', () => {
    it('should reset state to initial', () => {
      const newState = reducer([], actions.reset())
      expect(newState).toBe(initialState)
    })
  })

  describe('increment', () => {
    it('should increment skill by name', () => {
      for (let i = 0; i < middleSkills.length; ++i) {
        const skill = middleSkills[i]
        const newState = reducer(middleSkills, actions.increment({name: skill.name}))

        expect(newState).toEqual([
          ...middleSkills.slice(0, i),
          {...skill, count: skill.count + 1},
          ...middleSkills.slice(i + 1),
        ])
      }
    })

    it('should restrict count with limit', () => {
      const skills = middleSkills.concat(limitSkill)
      const newState = reducer(skills, actions.increment(limitSkill))

      expect(newState).toEqual(skills)
    })

    it('should return old state if name is not found', () => {
      const newState = reducer(middleSkills, actions.increment({name: notExistingName}))
      expect(newState).toBe(middleSkills)
    })
  })

  describe('decrement', () => {
    it('should decrement skill by name', () => {
      for (let i = 0; i < middleSkills.length; ++i) {
        const skill = middleSkills[i]
        const newState = reducer(middleSkills, actions.decrement({name: skill.name}))

        expect(newState).toEqual([
          ...middleSkills.slice(0, i),
          {...skill, count: skill.count - 1},
          ...middleSkills.slice(i + 1),
        ])
      }
    })

    it('should restrict count with 0', () => {
      const skills = middleSkills.concat(zeroSkill)
      const newState = reducer(skills, actions.decrement(limitSkill))

      expect(newState).toEqual(skills)
    })

    it('should return old state if name is not found', () => {
      const newState = reducer(middleSkills, actions.decrement({name: notExistingName}))
      expect(newState).toBe(middleSkills)
    })
  })

  describe('add', () => {
    const currentSkills: Skills = [
      {limit: 12, group: 0, name: '1', count: 1},
      {limit: 12, group: 0, name: '2', count: 2},
      {limit: 12, group: 0, name: '3', count: 3},
      {limit: 12, group: 0, name: '4', count: 4},
      {limit: 12, group: 0, name: '5', count: 5},
      {limit: 12, group: 0, name: '6', count: 6},
      {limit: 12, group: 0, name: '7', count: 7},
      {limit: 12, group: 0, name: '8', count: 8},
    ]

    test.each([
      [],
      currentSkills.map(skill => ({...skill, count: skill.count - 1})).slice(2, 5),
      currentSkills.slice(2, 5),
      currentSkills.slice(2, 5).map(skill => ({...skill, count: skill.count + 1})),
    ])('should add skills', (...skills) => {
      const newState = reducer(currentSkills, actions.add({skills}))

      expect(newState).toEqual(addSkillsCounts(newState, skills))
    })
  })
})
