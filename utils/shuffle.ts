
export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min
}

export function shuffle<T>(array: T[], number: number, duplicate?: boolean): T[] {
  const newArray = [];
  do {
    const randomIndex = getRandomInt(0, array.length),
      newItem = newArray.find(el => el === array[randomIndex]);

    if (!newItem || (newItem && duplicate)) { newArray.push(array[randomIndex]) }

  } while (array.length !== newArray.length);

  if (number <= array.length || duplicate) { return newArray.slice(0, number) } else {
    return newArray
  }
}
