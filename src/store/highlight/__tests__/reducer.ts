import * as actions from '../actions'
import {createHighlightReducer} from '../reducer'
import {Highlight, ItemHighlight, SkillHighlight} from '../types'

describe('highlight reducer', () => {
  const initialState = {}
  const reducer = createHighlightReducer(initialState)

  const oldItem: ItemHighlight = {skills: {}}
  const oldSkill: SkillHighlight = 'old'

  const newItem: ItemHighlight = {skills: {}}
  const newSkill: SkillHighlight = 'new'

  const oldStates: Array<Highlight | undefined> = [
    undefined,
    {},
    initialState,
    {item: oldItem},
    {skill: oldSkill},
  ]

  describe('reset', () => {
    test.each(oldStates)('should reset state', oldState => {
      const newState = reducer(oldState, actions.reset())

      expect(newState).toBe(initialState)
    })
  })

  describe('highlightItem', () => {
    test.each(oldStates)('should set item to provided value', oldValue => {
      const newState: Record<string, unknown> = reducer(
        oldValue,
        actions.highlightItem({item: newItem}),
      )

      expect(newState.item).toBe(newItem)
    })

    test.each(oldStates)('should unset skill', oldState => {
      const newState: Record<string, unknown> = reducer(
        oldState,
        actions.highlightItem({item: newItem}),
      )

      expect(newState.skill).toBeUndefined()
    })
  })

  describe('highlightSkill', () => {
    test.each(oldStates)('should set skill to provided value', oldState => {
      const newState: Record<string, unknown> = reducer(
        oldState,
        actions.highlightSkill({skill: newSkill}),
      )

      expect(newState.skill).toBe(newSkill)
    })

    test.each(oldStates)('should unset item', oldState => {
      const newState: Record<string, unknown> = reducer(
        oldState,
        actions.highlightSkill({skill: newSkill}),
      )

      expect(newState.item).toBeUndefined()
    })
  })
})
