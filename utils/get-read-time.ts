
export function getReadTime(text: string): number {
  const wordsPerMinute = 4;
  const numberOfWords = text.split(/\s/g).length;
  return Math.ceil(numberOfWords / wordsPerMinute);
}