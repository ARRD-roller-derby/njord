export interface QuestionInterface {
  _id:string
  question:string
  good_answers:string
  bad_answers:string[]
  active:boolean
  img?: string
  good_answers_num: number
  bad_answers_num: number
  difficulty: QuestionDifficulty
  updatedAt: Date
}

export enum QuestionDifficulty {
  veryEasy = 'very easy',
  easy = 'easy',
  normal = 'normal',
  hard = 'hard',
  veryHard = "very hard"
}