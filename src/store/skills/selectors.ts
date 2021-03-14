import {createSelector} from '@reduxjs/toolkit'
import {StateWithHistory} from 'redux-undo'
import {Skills} from './types'
import {selectItemHighlight} from '../highlight'
import {withHighlight} from './helpers'

export const selectSkills = createSelector(
  (state: {skills: StateWithHistory<Skills>}) => state.skills.present,
  selectItemHighlight,
  withHighlight,
)

// TODO: rework
export const selectSkillByName = (name?: string) => (state: {skills: StateWithHistory<Skills>}) =>
  state.skills.present.find(e => e.name === name)

export const selectHighlightedSkills = createSelector(
  selectItemHighlight,
  item => item?.skills || {},
)
