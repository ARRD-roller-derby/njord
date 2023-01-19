import { Schema, model, models } from 'mongoose'
import { RankingQuizInterface } from '../types/ranking-quiz.interface'

const rankingQuizSchema = new Schema<RankingQuizInterface>({
  quizId: String,
  userId: String,
  start: Date,
  end: Date,
  percent: Number,
  score: Number,
  speed: Number,
  answers: [String],
  updatedAt: Date,
})

const RankingQuiz = models.ranking_quiz || model('ranking_quiz', rankingQuizSchema)

rankingQuizSchema.pre('save', function (next) {
  this.updatedAt = new Date()
  next()
})

export default RankingQuiz