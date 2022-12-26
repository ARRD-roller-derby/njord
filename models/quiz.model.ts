import { Schema, model, models } from 'mongoose'
import { QuizInterface } from '../types/quiz.interface'

const quizSchema = new Schema<QuizInterface>({
  questions: [String],
  difficulty: String,
  type: String,
  day: {
    type: String,
    unique: true // `day` must be unique
  },
  updatedAt: Date,
})

const Quiz = models.quizzes || model('quizzes', quizSchema)

quizSchema.pre('save', function (next) {
  this.updatedAt = new Date()
  next()
})

export default Quiz