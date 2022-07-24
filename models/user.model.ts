import { Schema, model, models, Types } from "mongoose";
import { UserInterface } from "../types/User.interface";

const userSchema = new Schema<UserInterface>({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  avatar: String,
  name: String,
  lastname: String,
  emailVisibility: Boolean,
  phone: String,
  phoneVisibility: Boolean,
  addressVisibility: Boolean,
  lat: Number,
  lon: Number,
  numLicence: String,
  pronoun: String,
  wallet: Number,
  birthDate: Date,
  numRoster: String,
  derbyName: String,
  mst: Boolean,
  msp: Boolean,
  allergies: [String],
  profiles: [String],
  leagues: [String],
});

userSchema.methods.isAdmin = function isAdmin(): boolean {
  if (this.profiles && Array.isArray(this.profiles)) {
    return !!this.profiles.find((o: string) => o.match(/admin|bureau/));
  } else {
    return false;
  }
};

userSchema.methods.haveAGoodProfile = function haveAGoodProfile(
  profiles: string | Array<string>
): boolean {
  if (typeof profiles === "string") {
    return !!this.profiles.find((o: string) => o === profiles);
  } else if (Array.isArray(profiles)) {
    return !!this.profiles.filter(
      (o: string) => !!profiles.find((it: string) => it === o)
    );
  } else {
    return false;
  }
};

userSchema.methods.haveAGoodLeague = function haveAGoodLeague(
  leagues: string | Array<string>
): boolean {
  if (typeof leagues === "string") {
    return !!this.leagues.find((o: string) => o === leagues);
  } else if (Array.isArray(leagues)) {
    return !!this.leagues.filter(
      (o: string) => !!leagues.find((it: string) => it === o)
    );
  } else {
    return false;
  }
};

const User = models.users || model("users", userSchema);

export default User;
