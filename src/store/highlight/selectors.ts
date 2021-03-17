import {Highlight} from './types'

export const selectHighlight = (store: {highlight: Highlight}): Highlight => store.highlight
