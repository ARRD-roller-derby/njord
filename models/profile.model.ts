import { Schema, model, models } from 'mongoose'
import { ProfileInterface } from '../types/Profile.interface'

const profileSchema = new Schema<ProfileInterface>({
    name: String,
  }),
  Profile = models.profiles || model('profiles', profileSchema)

export default Profile
