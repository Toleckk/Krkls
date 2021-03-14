import {restrictPercents} from '../helpers'

describe('Line helpers', () => {
  describe('restrictPercents', () => {
    test.each([0.1, 0.2, 0.3, 0.44, 0.8, 1])(
      'should return provided value multiplied by 100 if it is less or equal to 1',
      value => {
        const result = restrictPercents(value)

        expect(result).toBe(value * 100)
      },
    )

    test.each([5, 39, 50, 99, 100])(
      'should return provided value if it is less or equal to 100 and greater then 1',
      value => {
        const result = restrictPercents(value)

        expect(result).toBe(value)
      },
    )

    test.each([102, 105, 500, 700, Infinity])(
      'should return 100 if provided value greater then 100',
      value => {
        const result = restrictPercents(value)

        expect(result).toBe(100)
      },
    )
  })
})
