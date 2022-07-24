import { Schema, model, models } from "mongoose";
import { LeagueInterface } from "../types/League.interface";

const leagueSchema = new Schema<LeagueInterface>({
    name: String,
  }),
  League = models.leagues || model("leagues", leagueSchema);

export default League;
