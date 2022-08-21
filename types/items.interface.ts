import { Types } from 'mongoose'

export interface ItemInterface {
  _id: Types.ObjectId
  name: string
  picture_url?: string
  ownerType: 'user' | 'league'
  owner: String
  localization: LocalizationItemInterface
  updatedAt: Date
}

export interface LocalizationItemInterface {
  type: 'user' | 'place'
  id: string
  name: string
  updatedAt: Date
}
