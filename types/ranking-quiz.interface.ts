import { UserInterface } from "./User.interface"

export interface RankingQuizInterface {
  _id: string
  quizId: string
  userId: string
  start: Date
  end: Date
  answers: string[]
  percent: number
  score: number
  updatedAt: Date
}

export interface RankingUserInterface {
  ranking: RankingQuizInterface
  user: UserInterface
}