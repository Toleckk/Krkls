import skills from '../../data/skills.json'
import {Skills} from './types'

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
