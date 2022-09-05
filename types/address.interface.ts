import { addressType } from './addressType.enum'

export interface addressInterface {
  _id: string
  ownerId: string
  lat: number
  lon: number
  city: string
  zipcode: string
  street: string
  label: string
  type: addressType
  updatedAt: Date
}
