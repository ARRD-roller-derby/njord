import { Schema, model, models } from 'mongoose'
import { addressInterface } from '../types/address.interface'

export const adressSchema = new Schema<addressInterface>({
  lat: Number,
  lon: Number,
  label: String,
  ownerId: String,
  city: String,
  zipcode: String,
  street: String,
  type: String,
})

adressSchema.index({
  label: 'text',
  city: 'text',
  street: 'text',
  zipcode: 'text',
})

const Address = models.adresses || model('adresses', adressSchema)

adressSchema.pre('save', function (next) {
  this.updatedAt = new Date()
  next()
})

Address.createIndexes()

export default Address
