import { Schema, model, models } from 'mongoose'
import { ISponsor } from '../types/sponsor.interface'

export const sponsorSchema = new Schema<ISponsor>({
  name: String,
  description: String,
  logo: String,
  link: String,
  users: [{ name: String, id: String }],
  updatedAt: Date,
})

const Sponsor = models.sponsors || model('sponsors', sponsorSchema)

sponsorSchema.pre('save', function (next) {
  this.updatedAt = new Date()
  next()
})

export default Sponsor