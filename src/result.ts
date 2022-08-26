import { None, Option, Some } from "./option";

type OkType<T> = {
  readonly value: T;
};
type ErrType<E> = {
  readonly error: E;
};

export interface Result<T, E> {
  isOk: () => this is OkType<T>;
  isOkAnd: (fn: (v: T) => boolean) => this is OkType<T>;
  isErr: () => this is ErrType<E>;
  isErrAnd: (fn: (e: E) => boolean) => this is ErrType<E>;
  ok: () => Option<T>;
  err: () => Option<E>;
  unwrap: () => T | never;
  map: <U>(fn: (value: T) => U) => Result<U, E>;
  mapOr: <U>(defaultValue: U, fn: (value: T) => U) => U;
  mapOrElse: <U>(defaultFn: (e: E) => U, fn: (v: T) => U) => U;
  inspect: (fn: (v: T) => void) => this;
  inspectErr: (fn: (e: E) => void) => this;
}

class _Ok<T, E = never> implements Result<T, E> {
  constructor(public readonly value: T) {}

  isOk() {
    return true;
  }

  isOkAnd(f: (v: T) => boolean) {
    return f(this.value);
  }

  isErr() {
    return false;
  }

  isErrAnd(_f: (e: E) => boolean) {
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

  mapOr<U>(_defaultValue: U, fn: (value: T) => U): U {
    return fn(this.value);
  }

  mapOrElse<U>(_defaultFn: (e: E) => U, fn: (v: T) => U): U {
    return fn(this.value);
  }

  inspect(fn: (v: T) => void) {
    fn(this.value);
    return this;
  }

  inspectErr(_fn: (v: E) => void) {
    return this;
  }
}

class _Err<E, T = never> implements Result<T, E> {
  constructor(public readonly error: E) {}

  isOk() {
    return false;
  }

  isOkAnd(_f: (v: T) => boolean) {
    return false;
  }

  isErr() {
    return true;
  }

  isErrAnd(f: (e: E) => boolean) {
    return f(this.error);
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
    return this as unknown as Result<U, E>;
  }

  mapOr<U>(defaultValue: U, _fn: (value: never) => U): U {
    return defaultValue;
  }

  mapOrElse<U>(defaultFn: (e: E) => U, _fn: (v: T) => U): U {
    return defaultFn(this.error);
  }

  inspect(_fn: (v: T) => void) {
    return this;
  }

  inspectErr(fn: (e: E) => void) {
    fn(this.error);
    return this;
  }
}

export const Ok = <T, E = never>(value: T): Result<T, E> => {
  return new _Ok(value);
};

export const Err = <E, T = never>(error: E): Result<T, E> => {
  return new _Err(error);
};
