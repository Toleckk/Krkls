import {
  extractContentFromSelection,
  isSelected,
  mapSelections,
  splitEffectBySelection,
} from '../helpers'

describe('Effects helpers', () => {
  describe('isSelected', () => {
    it('should return true if content is wrapped with |', () => {
      const selected = isSelected('|content|')

      expect(selected).toBe(true)
    })

    test.each(['|content|content', '|content', 'content|', 'content'])(
      'should return false if content is not wrapped with |',
      str => {
        const selected = isSelected(str)

        expect(selected).toBe(false)
      },
    )
  })

  describe('extractContentFromSelection', () => {
    it('should return content between |', () => {
      const content = extractContentFromSelection('|content|')

      expect(content).toBe('content')
    })

    it('should return empty string if input is ||', () => {
      const content = extractContentFromSelection('||')

      expect(content).toBe('')
    })

    test.each(['|content', 'content|', 'content', '|content|content'])(
      "should return input if it doesn't selected",
      str => {
        const content = extractContentFromSelection(str)

        expect(content).toBe(content)
      },
    )
  })

  describe('splitEffectBySelection', () => {
    test.each([
      ['{first} second third', ['first', ' second third']],
      ['first {second} third', ['first ', 'second', ' third']],
      ['first second {third}', ['first second ', 'third']],
    ])('should split by { or }', (str, expected) => {
      const split = splitEffectBySelection(str)

      expect(split).toEqual(expected)
    })
  })

  describe('mapSelections', () => {
    test.each([
      '{|selected content|} in the begin',
      'now {|selected content|} in the middle',
      'and now sentence ended with {|selected content|}',
    ])('should call fn with selected content', str => {
      const fn = jest.fn()
      mapSelections(str, fn)
      expect(fn.mock.calls[0][0]).toBe('selected content')
    })

    test.each([
      [
        "there's multiple contents: {|content1|}, {|content2|}, {|content3|}",
        ['content1', 'content2', 'content3'],
      ],
      [
        '{|content1|}, {|content2|}, {|content3|} and a lot of contents',
        ['content1', 'content2', 'content3'],
      ],
      [
        '{|content1|}, {|content2|}, {|content3|}, {|content4|}',
        ['content1', 'content2', 'content3', 'content4'],
      ],
      [
        '{|content1|}, {|content2|}, and last but not least — {|content3|}',
        ['content1', 'content2', 'content3'],
      ],
    ])('should call fn with multiple content', (str, contents) => {
      const fn = jest.fn()
      mapSelections(str, fn)

      expect(fn.mock.calls.map(e => e[0])).toEqual(contents)
    })

    it('should remove selection marks if id func is given', () => {
      const result = mapSelections(
        '{|content1|}, {|content2|}, content5, {|content3|}, {|content4|}',
        e => e,
      )

      expect(result.join('')).toBe('content1, content2, content5, content3, content4')
    })

    it('should replace selection with value returned by fn', () => {
      const result = mapSelections(
        '{|content1|}, {|content2|}, content5, {|content3|}, {|content4|}',
        str => ({str}),
      )

      expect(result).toEqual([
        {str: 'content1'},
        ', ',
        {str: 'content2'},
        ', content5, ',
        {str: 'content3'},
        ', ',
        {str: 'content4'},
      ])
    })

    it('should call fn with element index', () => {
      const fn = jest.fn()
      mapSelections('{|content1|}, {|content2|}, content5, {|content3|}, {|content4|}', fn)

      expect(fn.mock.calls.map(e => e[1])).toEqual([0, 2, 4, 6])
    })

    it('should not call fn if there is no selections', () => {
      const fn = jest.fn()
      mapSelections('there is no selections here', fn)

      expect(fn).not.toBeCalled()
    })
  })
})
