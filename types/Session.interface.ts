import { UserInterface } from "./User.interface";

export interface Session {
  readonly user: UserInterface;
  readonly isAdmin: boolean;
}
