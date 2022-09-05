import { Schema, model, models } from 'mongoose'
import { LeagueInterface } from '../types/League.interface'

const leagueSchema = new Schema<LeagueInterface>({
    name: String,
    id_association: {
      type: String,
      unique: true,
      required: true,
    },
    shortName: String,
    resume: String,
    city: String,
    zipCode: String,
    admins:[String],
    teams: [String],
  }),
  League = models.leagues || model('leagues', leagueSchema)

export default League
