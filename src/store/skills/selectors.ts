import {createSelector} from '@reduxjs/toolkit'
import {StateWithHistory} from 'redux-undo'
import {Skills} from './types'
import {selectItemHighlight} from '../highlight'

export const selectSkills = (state: {skills: StateWithHistory<Skills>}) => state.skills.present

// TODO: rework
export const selectSkillByName = (name?: string) => (state: {skills: StateWithHistory<Skills>}) =>
  state.skills.present.find(e => e.name === name)

export const selectHighlightedSkills = createSelector(
  selectItemHighlight,
  item => item?.skills || {},
)
