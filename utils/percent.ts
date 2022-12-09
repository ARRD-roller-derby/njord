export function percent(partial: number = 0, total: number = 0): number {
  const result = (100 * partial) / total
  return isNaN(result) ? 100 : parseFloat(result.toFixed(2))
}