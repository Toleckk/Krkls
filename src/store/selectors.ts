import {StateWithHistory} from 'redux-undo'
import {Highlight} from './highlight'
import {Item, Items} from './items'
import {Lvls} from './lvls'
import {Skills} from './skills'

export const selectHighlight = (store: {highlight: Highlight}): Highlight => store.highlight

export const selectItems = (state: {items: Item[]}): Items => state.items

export const selectLvls = (state: {lvls: Lvls}): Lvls => state.lvls

export const selectSkills = (state: {skills: StateWithHistory<Skills>}): StateWithHistory<Skills> =>
  state.skills

export const selectPresentSkills = (state: {skills: StateWithHistory<Skills>}): Skills =>
  state.skills.present
