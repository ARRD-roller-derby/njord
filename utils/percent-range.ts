export const percentRange = (min: number, max: number, value: number): number => {
  const result = ((value - min) * 100) / (max - min)
  const percent = isNaN(result) ? 100 : parseFloat(result.toFixed(2))
  if (percent === 0) return 100
  if (percent === 100) return 0
  return percent
}

