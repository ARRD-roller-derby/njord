export interface IPoll {
  _id: string
  profile: string
  leagueId: string
  description: string
  multiChoice: boolean
  options: IPollOption[]
  votes: IPollVote[]
  visibility: IPollVisibility
  expireAt: Date
  createdAt: Date
  updatedAt: Date
}

export interface IPollOption {
  text: string
  id: string
}

export interface IPollVote {
  optionId: string
  userId: string
}

export enum IPollVisibility {
  league = 'league',
  public = 'public'
}