import { None, Option, Some } from "./option";

type OkType<T> = {
  readonly value: T;
};
type ErrType<E> = {
  readonly error: E;
};

export interface Result<T, E> {
  is_ok: () => this is OkType<T>;
  is_err: () => this is ErrType<E>;
  ok: () => Option<T>;
  err: () => Option<E>;
  unwrap: () => T | never;
  map: <U>(fn: (value: T) => U) => Result<U, E>;
}

class _Ok<T> implements Result<T, never> {
  constructor(public readonly value: T) {}

  is_ok() {
    return true;
  }

  is_err() {
    return false;
  }

  ok() {
    return Some(this.value);
  }

  err() {
    return None();
  }

  unwrap(): T {
    return this.value;
  }

  map<U>(fn: (value: T) => U): Result<U, never> {
    return Ok(fn(this.value));
  }
}

class _Err<E> implements Result<never, E> {
  constructor(public readonly error: E) {}

  is_ok() {
    return false;
  }

  is_err() {
    return true;
  }

  ok() {
    return None();
  }

  err() {
    return Some(this.error);
  }

  unwrap(): never {
    throw new Error("unexpected unwrap");
  }

  map<U>(_fn: (value: never) => U): Result<never, E> {
    return this;
  }
}

export const Ok = <T>(value: T): Result<T, never> => {
  return new _Ok(value);
};

export const Err = <E>(error: E): Result<never, E> => {
  return new _Err(error);
};
