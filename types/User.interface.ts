import { Pronoun } from "./Pronoun.enum";

export interface UserInterface {
  id?: string;
  _id: string;
  email: string;
  avatar?: string;
  name?: string;
  lastname?: string;
  admin?: boolean;
  admin_game?: boolean
  rank_card?: string
  emailVisibility?: string;
  phone?: string;
  phoneVisibility?: string;
  addressVisibility?: string;
  notificationPrefs?: string;
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
  league?: {
    shortName: string;
    id: string
  },
  teams?: Array<string>,
  profiles?: Array<string>;
  allergies?: Array<string>;
}