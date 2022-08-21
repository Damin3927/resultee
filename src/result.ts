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

class _Ok<T, E = never> implements Result<T, E> {
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

  map<U>(fn: (value: T) => U): Result<U, E> {
    return Ok(fn(this.value));
  }
}

class _Err<E, T = never> implements Result<T, E> {
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

  map<U>(_fn: (value: never) => U): Result<U, E> {
    return this as Result<U, E>;
  }
}

export const Ok = <T, E = never>(value: T): Result<T, E> => {
  return new _Ok(value);
};

export const Err = <E, T = never>(error: E): Result<T, E> => {
  return new _Err(error);
};
