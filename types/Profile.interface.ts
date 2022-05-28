export interface profile {
  id: number;
  name: string;
  avatar?: string;
  updatedAt: Date;
  createdAt: Date;
}

export enum ProfilesName {
  bureau = "bureau",
  coach = "coach",
  dev= "développeur",
  com = "communication",
  membre="membre",
  superadmin= "superadmin"
}