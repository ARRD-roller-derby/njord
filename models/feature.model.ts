import { Schema, model, models } from 'mongoose'
import { FeatureInterface } from '../types/feature.interface'

const featureSchema = new Schema<FeatureInterface>({
  name:String,
  userId:String,
  updatedAt: Date,
  exp: Date
})

const Feature = models.features || model('features', featureSchema)

featureSchema.pre('save', function (next) {
  this.updatedAt = new Date()
  next()
})

export default Feature