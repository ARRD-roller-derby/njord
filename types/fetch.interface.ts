import Error from "./error.interface";

export interface Fetch {
  readonly loading: boolean;
  readonly error: Error;
  readonly data: any;
  readonly refetch: Function
}