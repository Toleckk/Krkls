import {configureStore} from '@reduxjs/toolkit'
import undoable from 'redux-undo'
import {createSkillsReducer, getDefaultSkills} from './skills'
import {createItemsReducer, getDefaultItems} from './items'
import {createHighlightReducer, getDefaultHighlight} from './highlight'
import {createLvlsReducer, getDefaultLvls} from './lvls'
import {Store} from './types'

export const store = configureStore<Store>({
  reducer: {
    skills: undoable(createSkillsReducer(getDefaultSkills())),
    highlight: createHighlightReducer(getDefaultHighlight()),
    items: createItemsReducer(getDefaultItems()),
    lvls: createLvlsReducer(getDefaultLvls()),
  },
})
