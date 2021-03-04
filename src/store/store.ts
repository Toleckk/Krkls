import {configureStore} from '@reduxjs/toolkit'
import undoable from 'redux-undo'
import {reducer as skills} from './skills'
import {reducer as items} from './items'
import {reducer as highlight} from './highlight'
import {reducer as lvls} from './lvls'

export const store = configureStore({
  reducer: {
    skills: undoable(skills),
    highlight,
    items,
    lvls,
  },
})

store.subscribe(() =>
  window.history.replaceState(
    {},
    '',
    `/${store
      .getState()
      .skills.present.map(skill => skill.count)
      .join('')}`,
  ),
)
