import {addSkillsCounts, adjustByName, findByName} from '../helpers'
import {Skills} from '../types'

describe('skills helpers', () => {
  describe('adjustByName', () => {
    const notExistingName: string = 'not-existing-name'
    const list = Array(10)
      .fill(0)
      .map((_, i) => ({name: String(i)}))

    it('should replace value in list with value returned by fn', () => {
      for (let i = 0; i < list.length; ++i) {
        const name = list[i].name

        const expected = {name, fromFn: true}

        const newList = adjustByName(name, () => expected, list)

        expect(newList[i]).toBe(expected)
      }
    })

    it('should replace only first value', () => {
      const index = 4
      const listWithDuplication = list.concat(list[index])

      const newElement = {name: list[index].name, fromFn: true}
      const fn = jest.fn(() => newElement)

      const newList = adjustByName(listWithDuplication[index].name, fn, listWithDuplication)

      expect(fn).toBeCalledTimes(1)
      expect(newList).toEqual([
        ...listWithDuplication.slice(0, index),
        newElement,
        ...listWithDuplication.slice(index + 1),
      ])
    })

    it('should call fn with current element', () => {
      for (let i = 0; i < list.length; ++i) {
        const element = list[i]

        const fn = jest.fn()

        adjustByName(element.name, fn, list)

        expect(fn).toBeCalledWith(element)
      }
    })

    it('should keep rest elements unchanged', () => {
      for (let i = 0; i < list.length; ++i) {
        const {name} = list[i]

        const newElement = {name, fromFn: true}

        const newList = adjustByName(name, () => newElement, list)

        expect(newList).toEqual([...list.slice(0, i), newElement, ...list.slice(i + 1)])
      }
    })

    it('should return input list if name is not found', () => {
      const newList = adjustByName(notExistingName, name => ({...name, fromFn: true}), list)
      expect(newList).toEqual(list)
    })

    it('should not mutate input list', () => {
      for (let i = 0; i < list.length; ++i) {
        const listCopy = [...list]

        adjustByName(list[i].name, e => ({...e}), list)

        expect(list).toEqual(listCopy)
      }
    })
  })

  describe('findByName', () => {
    const name: string = 'name'
    const notExistingName: string = 'not existing name'
    const item = {name}
    const items = [{name: 'a'}, item, {name: 'b'}]

    it('should return matching element', () => {
      const found = findByName(name, items)

      expect(found).toBe(item)
    })

    it('should return first matching element', () => {
      const found = findByName(name, items.concat({...item}))

      expect(found).toBe(item)
    })

    it('should return undefined if name is not found', () => {
      const found = findByName(notExistingName, items)

      expect(found).toBeUndefined()
    })
  })

  describe('addSkillsCounts', () => {
    const skillFields = {limit: 12, group: 0}
    const currentSkills: Skills = [
      {...skillFields, name: '1', count: 1},
      {...skillFields, name: '2', count: 2},
      {...skillFields, name: '3', count: 3},
      {...skillFields, name: '4', count: 4},
      {...skillFields, name: '5', count: 5},
      {...skillFields, name: '6', count: 6},
      {...skillFields, name: '7', count: 7},
      {...skillFields, name: '8', count: 8},
    ]

    it('should return currentSkills if minSkills is empty', () => {
      const skills = addSkillsCounts(currentSkills, [])

      expect(skills).toEqual(currentSkills)
    })

    it('should not change skill count if it is greater', () => {
      const skills = addSkillsCounts(
        currentSkills,
        currentSkills
          .map(skill => ({
            ...skill,
            count: skill.count - 1,
          }))
          .slice(2, 5),
      )

      expect(skills).toEqual(currentSkills)
    })

    it('should not change skill count if it equals', () => {
      const skills = addSkillsCounts(currentSkills, currentSkills.slice(2, 5))

      expect(skills).toEqual(currentSkills)
    })

    it('should add skill count if it is less', () => {
      const required = currentSkills.slice(2, 5).map(skill => ({...skill, count: skill.count + 1}))
      const skills = addSkillsCounts(currentSkills, required)

      expect(skills).toEqual([...currentSkills.slice(0, 2), ...required, ...currentSkills.slice(5)])
    })
  })
})
