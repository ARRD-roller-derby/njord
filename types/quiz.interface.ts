export interface QuizInterface {
  _id: string
  questions: string[]
  difficulty: string
  updatedAt: Date
  day: string
  type: QuizType
}

export enum QuizType {
  daily = 'daily',
  user = 'user',
  ms = 'ms'
} 
