type SomeType<T> = {
  readonly value: T;
};

export interface Option<T> {
  isSome: () => this is SomeType<T>;
  isNone: () => this is this extends SomeType<T> ? never : SomeType<T>;
  unwrap: () => T | never;
  unwrapOr: <U>(defaultValue: U) => T | U;
  map: <U>(fn: (value: T) => U) => Option<U>;
}

class _Some<T> implements Option<T> {
  constructor(public readonly value: T) {}

  isSome() {
    return true;
  }

  isNone() {
    return false;
  }

  unwrap(): T {
    return this.value;
  }

  unwrapOr<U>(_defaultValue: U): T {
    return this.value;
  }

  map<U>(fn: (value: T) => U) {
    return new _Some(fn(this.value));
  }
}

class _None implements Option<never> {
  constructor() {}

  isSome() {
    return false;
  }

  isNone() {
    return true;
  }

  unwrap(): never {
    throw new Error("unexpected unwrap");
  }

  unwrapOr<U>(defaultValue: U): U {
    return defaultValue;
  }

  map<U>(_fn: (value: never) => U) {
    return new _None();
  }
}

export const Some = <T>(value: T): Option<T> => {
  return new _Some(value);
};

export const None = (): Option<never> => {
  return new _None();
};

export function match<T, TReturn>(
  value: Option<T>
): (switchCase: { Some: (v: T) => TReturn; None: () => TReturn }) => TReturn {
  if (value.isSome()) {
    return (switchCase) => {
      return switchCase.Some(value.value);
    };
  } else {
    return (switchCase) => {
      return switchCase.None();
    };
  }
}
