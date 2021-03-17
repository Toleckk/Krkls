import {selectItems} from '../selectors'
import {Item} from '../types'

describe('selectItems', () => {
  it('should return items', () => {
    const items: Item[] = []
    const selected = selectItems({items})

    expect(selected).toBe(items)
  })
})
