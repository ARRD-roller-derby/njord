export interface QuestionInterface {
  _id: string
  question: string
  answers: IAnswer[]
  active: boolean
  img?: string
  good_answers_num: number
  bad_answers_num: number
  difficulty: QuestionDifficulty
  updatedAt: Date
}

export interface IAnswer {
  type: 'good' | 'bad'
  answer: string
  id: string
}
export enum QuestionDifficulty {
  veryEasy = 'very easy',
  easy = 'easy',
  normal = 'normal',
  hard = 'hard',
  veryHard = "very hard"
}