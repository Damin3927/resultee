export interface Option<T> {
  is_some: () => this is { value: T };
  is_none: () => this is this extends { value: T } ? never : { value: T };
  unwrap: () => T | never;
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
}

export const Some = <T>(value: T): Option<T> => {
  return new _Some(value);
};

export const None = (): Option<never> => {
  return new _None();
};
