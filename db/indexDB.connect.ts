import Dexie, { Table } from "dexie";
import { LeagueInterface } from "../types/League.interface";
import { UserInterface } from "../types/User.interface";

class MySubClassedDexie extends Dexie {
  users!: Table<UserInterface>;
  leagues!: Table<LeagueInterface>;

  constructor() {
    super("njord");
    this.version(1).stores({
      users:
        "++_id,email,avatar,name,lastname,mst,msp,profiles,leagues,numRoster,derbyName,pronoun,numLicence,lat,lon",
      leagues: "++id,name,city"
    });
  }
}

const idb = new MySubClassedDexie();

declare global {
  var indexDB: any | undefined;
}

export const indexDB = global.idb || idb;
if (process.env.NODE_ENV !== "production") indexDB.idb = idb;
