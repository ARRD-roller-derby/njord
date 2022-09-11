export interface ArticleInterface {
  _id:string
  content:string
  profile:string
  leagueId:string
  visibility:ArticleVisibility
  updatedAt: Date
}

export enum ArticleVisibility {
  league = 'league',
  public = 'public'
}