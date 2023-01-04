import { Schema, model, models } from 'mongoose'
import { UserInterface } from '../types/User.interface'

const userSchema = new Schema<UserInterface>({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  avatar: String,
  name: String,
  lastname: String,
  emailVisibility: String,
  phone: String,
  phoneVisibility: String,
  addressVisibility: String,
  notificationPrefs: String,
  numLicence: String,
  pronoun: String,
  admin: Boolean,
  admin_game: Boolean,
  wallet: Number,
  birthDate: Date,
  numRoster: String,
  derbyName: String,
  mst: Boolean,
  msp: Boolean,
  rank_card: String,
  dailyContestAvgTime: Number,
  dailyContestAvgAccuracy: Number,
  allergies: [String],
  profiles: [String],
  league: {
    shortName: String,
    id: String,
  },
  teams: [String],
})

userSchema.methods.haveAGoodProfile = function haveAGoodProfile(
  profiles: string | Array<string>
): boolean {
  if (typeof profiles === 'string') {
    return !!this.profiles.find((o: string) => o === profiles)
  } else if (Array.isArray(profiles)) {
    return !!this.profiles.filter(
      (o: string) => !!profiles.find((it: string) => it === o)
    )
  } else {
    return false
  }
}

userSchema.methods.haveAGoodLeague = function haveAGoodLeague(
  leaguesId: string | Array<string>
): boolean {
  if (typeof leaguesId === 'string') {
    return this.league.id === leaguesId
  } else if (Array.isArray(leaguesId)) {
    return !!leaguesId.find((it: string) => it === this.league.id)
  } else {
    return false
  }
}

//TODO revoir en fonction de la liste. sauf si on défini qu'il faut la league avant
userSchema.methods.canIUpdateThisField = function canIUpdateThisField(
  id: string,
  field: string
): boolean {

  const userFields = [
    'emailVisibility',
    'phoneVisibility',
    'notificationPrefs',
    'addressVisibility',
  ],
    coachFields = ['mst', 'msp', 'teams', 'teams'],
    bureauFields = ['profiles'],
    forbiddenFields = ['wallet', 'league']

  if (this.isAdmin) return true

  //nobody can't touch this fields
  if (forbiddenFields.find((o) => o === field)) return true
  //just user can update this fields
  if (userFields.find((o) => o === field) && id === this._id) return true

  //Coachs and bureau
  if (
    coachFields.find((o) => o === field) &&
    this.profiles.find((o: string) => o.match(/bureau|coach/))
  )
    return true

  //Bureau
  if (
    bureauFields.find((o) => o === field) &&
    this.profiles.find((o: string) => o.match(/bureau/))
  )
    return true

  return true
}

const User = models.users || model('users', userSchema)

export default User
