import { Schema, model, models } from 'mongoose'
import { RequestInterface } from '../types/Request.interface'

const valueSchema = new Schema({
  shortName:String,
  leagueId:String,
  itemId: String,
  userId: String,
  name:String,
  league: String,
  subType: String,
  email:String
});

const requestSchema = new Schema<RequestInterface>({
    userId: String,
    type: String,
    token: String,
    resume: String,
    value: valueSchema,
    updatedAt: Date,
  }),
  Request = models.requests || model('requests', requestSchema)

requestSchema.pre('save', function (next) {
  this.updatedAt = new Date()
  next()
})

export default Request
