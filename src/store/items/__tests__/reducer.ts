import {createItemsReducer} from '../reducer'
import {Items} from '../types'

describe('items reducer', () => {
  const initialState: Items = []
  const reducer = createItemsReducer(initialState)

  it('should not change initialState', () => {
    const newState = reducer(undefined, {type: 'any'})

    expect(newState).toBe(initialState)
  })
})
