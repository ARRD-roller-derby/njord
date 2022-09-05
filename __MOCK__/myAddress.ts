import dayjs from 'dayjs'
import { addressInterface } from '../types/address.interface'
import { addressType } from '../types/addressType.enum'
export const myAddress: addressInterface = {
  _id: 'fake_id',
  label: 'my address',
  lat: 2.222222,
  lon: 3.333333,
  ownerId: 'my_id',
  city: 'Gotham City',
  zipcode: '010101',
  street: 'Rue du crime',
  type: addressType.personnal,
  updatedAt: dayjs('01/01/2022').toDate(),
}
