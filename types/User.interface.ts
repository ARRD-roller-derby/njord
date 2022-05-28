import { allergy } from "./Allergy.interface";
import { league } from "./League.interface";
import { notification } from "./Notification.interface";
import { profile } from "./Profile.interface";
import { Pronoun } from "./Pronoun.enum";

export interface User {
  id?: number;
  email: string;
  avatar?: string;
  name: string;
  lastname?: string;
  emailVisibility?: boolean;
  phone?: string;
  phoneVisibility?: boolean;
  addressVisibility?: boolean;
  lat?: number;
  lon?: number;
  numLicence?: string;
  pronoun?: Pronoun;
  wallet: number;
  birthDate?: Date;
  numRoster?: string;
  derbyName?: string;
  mst?: boolean;
  msp?: boolean;
  leagues?: Array<{league:league}>;
  profiles?:Array<{profile:profile}>;
  allergies?:Array<{allergy:allergy}>;
  notifications?: Array<{notification:notification}>;
  sub?: string;
  isConnected?: boolean;
  loading?: boolean,
}