import { Option, Some, None, match } from "../src/option";

describe("Option", () => {
  let some: Option<number>;
  let none: Option<number>;

  beforeEach(() => {
    some = Some(123);
    none = None();
  });

  describe(".isSome", () => {
    it("works well", () => {
      expect(some.isSome()).toBeTruthy();
      expect(none.isSome()).toBeFalsy();
    });
  });

  describe(".isNone", () => {
    it("works well", () => {
      expect(some.isNone()).toBeFalsy();
      expect(none.isNone()).toBeTruthy();
    });
  });

  it("can be used as return values", () => {
    function returns_some(): Option<number> {
      return some;
    }

    some = returns_some();
    if (some.isSome()) {
      expect(some.value).toBe(123);
    }

    function returns_none(): Option<number> {
      return None();
    }

    none = returns_none();
    if (none.isNone()) {
      expect(none).not.toHaveProperty("value");
    }
  });

  describe(".unwrap", () => {
    it("works well", () => {
      expect(some.unwrap()).toBe(123);
      expect(() => none.unwrap()).toThrow("unexpected unwrap");
    });
  });

  describe(".unwrapOr", () => {
    it("works correctly", () => {
      expect(some.unwrapOr(456)).toBe(123);
      expect(none.unwrapOr(456)).toBe(456);
    });
  });

  describe(".map", () => {
    it("works correctly", () => {
      const fn = (value: number) => value * 2;
      expect(some.map(fn).unwrap()).toBe(246);
      expect(none.map(fn)).toEqual(None());
    });
  });

  describe("match", () => {
    const pureMatcher = (value: Option<number>) => {
      return match(value)({
        Some: (v) => v,
        None: () => 0,
      });
    };

    it("works when matching pure some", () => {
      expect(pureMatcher(some)).toBe(123);
      expect(pureMatcher(none)).toBe(0);
    });
  });
});
