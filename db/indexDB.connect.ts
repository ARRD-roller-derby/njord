import Dexie, { Table } from 'dexie'
import { LeagueInterface } from '../types/League.interface'
import { UserInterface } from '../types/User.interface'

class MySubClassedDexie extends Dexie {
  users!: Table<UserInterface>
  leagues!: Table<LeagueInterface>

  constructor() {
    super('njord')
    this.version(5).stores({
      users: '++_id,_id,email,name,lastname,mst,msp,profiles,numRoster,derbyName,pronoun,numLicence',
      leagues:'++id,_id,name,city,id_association,shortName,resume,zipCode',
      notifications: '++id,_id,text,userId,type,value,state',
      requests: '++id,type,token',
      addresses: '++id,label,city,isHome,isStadium',
    })
  }
}
const idb = new MySubClassedDexie()

declare global {
  var indexDB: any | undefined
}

export const indexDB = global.idb || idb
if (process.env.NODE_ENV !== 'production') indexDB.idb = idb
