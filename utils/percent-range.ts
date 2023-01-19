export const percentRange = (min: number, max: number, value: number): number => {
  const result = ((value - min) * 100) / (max - min)
  console.log('percentRange', { min, max, value, result })
  return isNaN(result) ? 100 : parseFloat(result.toFixed(2))
}

