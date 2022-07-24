import { Pronoun } from "./Pronoun.enum";

export interface UserInterface {
  id?: string;
  _id:string;
  email: string;
  avatar?: string;
  name?: string;
  lastname?: string;
  emailVisibility?: boolean;
  phone?: string;
  phoneVisibility?: boolean;
  addressVisibility?: boolean;
  lat?: number;
  lon?: number;
  numLicence?: string;
  pronoun?: Pronoun;
  wallet?: number;
  birthDate?: Date;
  numRoster?: string;
  derbyName?: string;
  mst?: boolean;
  msp?: boolean;
  profiles?:Array<string>;
  leagues?: Array<string>;
  allergies?: Array<string>;
}