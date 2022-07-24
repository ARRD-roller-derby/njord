export interface SessionDb {
  readonly sessionToken: string;
  readonly userId: string;
  readonly expires: Date;
}
