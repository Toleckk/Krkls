import {StateWithHistory} from 'redux-undo'
import {Highlight} from './highlight'
import {Item} from './items'
import {Lvls} from './lvls'
import {Skills} from './skills'

export const selectHighlight = (store: {highlight: Highlight}): Highlight => store.highlight

export const selectItems = (state: {items: Item[]}) => state.items

export const selectLvls = (state: {lvls: Lvls}) => state.lvls

export const selectSkills = (state: {skills: StateWithHistory<Skills>}) => state.skills

export const selectPresentSkills = (state: {skills: StateWithHistory<Skills>}) =>
  state.skills.present
