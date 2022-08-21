import { Schema, model, models } from 'mongoose'
import { Token } from '../types/Token.interface'

const tokenSchema = new Schema<Token>({
    identifier: String,
    token: String,
    expires: Date,
  }),
  Token =
    models.verification_tokens || model('verification_tokens', tokenSchema)

export default Token
