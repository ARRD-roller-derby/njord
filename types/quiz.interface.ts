export interface QuizInterface {
  _id:string
  questions:string[]
  difficulty:string
  ranking: RankingQuizInterface
  updatedAt: Date
}

export interface RankingQuizInterface {
  userId: string
  userName: string
  time: number
  score:number
  updatedAt: Date
}