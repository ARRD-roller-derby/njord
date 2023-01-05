import { IRankingGeneralUser } from "../types/ranking-quiz.interface";

export const getPodiumPlace = (podium: number[], user: IRankingGeneralUser, type: 'percent' | 'speed'): number => {

  const key = type === 'percent' ? 'dailyContestAvgAccuracy' : 'dailyContestAvgTime'
  const index = podium.findIndex(p => p === user?.[key])
  return index + 1

}