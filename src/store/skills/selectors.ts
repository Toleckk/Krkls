import {StateWithHistory} from 'redux-undo'
import {Skills} from './types'

export const selectSkills = (state: {skills: StateWithHistory<Skills>}) => state.skills

export const selectPresentSkills = (state: {skills: StateWithHistory<Skills>}) =>
  state.skills.present
