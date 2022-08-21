type SomeType<T> = {
  readonly value: T;
};

export interface Option<T> {
  is_some: () => this is SomeType<T>;
  is_none: () => this is this extends SomeType<T>
    ? never
    : { readonly value: T };
  unwrap: () => T | never;
  unwrap_or: <U>(defaultValue: U) => T | U;
}

class _Some<T> implements Option<T> {
  constructor(public readonly value: T) {}

  is_some() {
    return true;
  }

  is_none() {
    return false;
  }

  unwrap(): T {
    return this.value;
  }

  unwrap_or<U>(_defaultValue: U): T {
    return this.value;
  }
}

class _None implements Option<never> {
  constructor() {}

  is_some() {
    return false;
  }

  is_none() {
    return true;
  }

  unwrap(): never {
    throw new Error("unexpected unwrap");
  }

  unwrap_or<U>(defaultValue: U): U {
    return defaultValue;
  }
}

export const Some = <T>(value: T): Option<T> => {
  return new _Some(value);
};

export const None = (): Option<never> => {
  return new _None();
};
