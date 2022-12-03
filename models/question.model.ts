import { Schema, model, models } from 'mongoose'
import { QuestionInterface } from '../types/question.interface'

const  questionSchema = new Schema<QuestionInterface>({
  question: String,
  good_answers: String,
  bad_answers: [String],
  active: Boolean,
  img:String,
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