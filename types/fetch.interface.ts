import Error from "./error.interface";

export interface Fetch<T> {
  readonly loading: boolean;
  readonly error: Error;
  readonly data: T;
  refetch: (body?: Object) => void
  reSync: (body?: Object) => void
}