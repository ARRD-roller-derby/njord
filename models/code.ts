import { Schema, model, models } from 'mongoose'
import { ICode } from '../types/code.interface'

const codeSchema = new Schema<ICode>({
  code: String,
  email: String,
  url: String,
  token: String,
  numberTry: Number,
  verifyKey: String,
  expiresAt: Date,
  updatedAt: Date,
})

const Code = models.codes || model('codes', codeSchema)

codeSchema.pre('save', function (next) {
  this.updatedAt = new Date()
  next()
})

export default Code