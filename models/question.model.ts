import { Schema, model, models } from 'mongoose'
import { IAnswer, QuestionInterface } from '../types/question.interface'


const answerShema = new Schema<IAnswer>({
  type: String,
  id: String,
  answer: String,
})

const questionSchema = new Schema<QuestionInterface>({
  question: String,
  answers: [answerShema],
  active: Boolean,
  img: String,
  good_answers_num: Number,
  bad_answers_num: Number,
  difficulty: String,
  updatedAt: Date,
})

const Question = models.questions || model('questions', questionSchema)

questionSchema.pre('save', function (next) {
  this.updatedAt = new Date()
  next()
})

export default Question