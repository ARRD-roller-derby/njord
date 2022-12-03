import { Schema, model, models } from 'mongoose'
import { QuizInterface, RankingQuizInterface } from '../types/quiz.interface'

const rankingSchema = new Schema<RankingQuizInterface>({
  userId: String,
  userName: String,
  time: Number,
  score:Number,
  updatedAt:Date
});

const  quizSchema = new Schema<QuizInterface>({
  questions: [String],
  difficulty: String,
  ranking: [rankingSchema],
  updatedAt: Date,
})

const Quiz = models.questions || model('quiz', quizSchema)

export const RankingSchema = models.attendees || model('ranking', rankingSchema)


quizSchema.pre('save', function (next) {
  this.updatedAt = new Date()
  next()
})

export default Quiz