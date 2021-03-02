import lvls from '../data/lvls.json'

export const getExperience = lvl => lvls[lvl]

export const short = n => {
  if (n < 1000) return n

  const num = ~~(n / 1000)
  const rest = n % 1000

  if (num < 1000) return num + '.' + Math.round(rest / 10) + 'K'

  return (short(num) + 'K').replace(/KK/g, 'M').replace(/MK/g, 'B').replace(/BK/g, 'T')
}
