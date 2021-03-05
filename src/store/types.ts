import {StateWithHistory} from 'redux-undo'
import {Skills} from './skills'
import {Highlight} from './highlight'
import {Items} from './items'
import {Lvls} from './lvls'

export type Store = {
  skills: StateWithHistory<Skills>
  highlight: Highlight
  items: Items
  lvls: Lvls
}
