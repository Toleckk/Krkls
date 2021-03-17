import {selectLvls} from '../selectors'

describe('selectLvls', () => {
  it('should return lvls state', () => {
    const lvls: number[] = []
    const selected = selectLvls({lvls})
    expect(selected).toBe(lvls)
  })
})
