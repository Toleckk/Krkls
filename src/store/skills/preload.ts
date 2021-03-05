import {Skills} from './types'
import skills from '../../data/skills.json'

export const getDefaultSkills = (): Skills => {
  const counts = urlToCounts(window.location.pathname)

  return skills.map((skill, i) => ({...skill, count: counts[i] || 0}))
}

export const urlToCounts = (str: string): number[] => {
  const nums = str.match(/[0-9a-c]{16}/)?.[0].split('')

  if (!nums) {
    return []
  }

  return nums.map(num => parseInt(num, 13))
}
