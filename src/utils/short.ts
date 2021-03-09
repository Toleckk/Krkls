export const short = (n: number): string => {
  if (n < 1000) {
    return String(n)
  }

  const num = ~~(n / 1000)
  const rest = n % 1000

  if (num < 1000) {
    return num + '.' + Math.round(rest / 10) + 'K'
  }

  return (short(num) + 'K').replace(/KK/g, 'M').replace(/MK/g, 'B').replace(/BK/g, 'T')
}
