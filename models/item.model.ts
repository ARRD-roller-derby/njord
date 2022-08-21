import { Schema, model, models } from 'mongoose'
import { ItemInterface, LocalizationItemInterface } from '../types/items.interface'

const localization = new Schema<LocalizationItemInterface>({
  type: String,
  id: String,
  name: String,
})

const itemSchema = new Schema<ItemInterface>({
  name: String,
  picture_url: String,
  owner: String,
  ownerType: String,
  localization,
})

const Item = models.items || model('items', itemSchema)

itemSchema.pre('save', function (next) {
  this.updatedAt = new Date()
  next()
})

localization.pre('save', function (next) {
  this.updatedAt = new Date()
  next()
})

export default Item
