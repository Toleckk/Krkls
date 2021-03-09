import {createLvlsReducer} from '../reducer'
import {Lvls} from '../types'

describe('lvls reducer', () => {
  const initialState: Lvls = []
  const reducer = createLvlsReducer(initialState)

  it('should not change initialState', () => {
    const newState = reducer(undefined, {type: 'any'})

    expect(newState).toBe(initialState)
  })
})
