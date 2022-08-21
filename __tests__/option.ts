import { Option, Some, None } from "../src/option";

describe("Option", () => {
  let some: Option<number>;
  let none: Option<number>;

  beforeEach(() => {
    some = Some(123);
    none = None();
  });

  describe(".is_some", () => {
    it("works well", () => {
      expect(some.is_some()).toBeTruthy();
      expect(none.is_some()).toBeFalsy();
    });
  });

  describe(".is_none", () => {
    it("works well", () => {
      expect(some.is_none()).toBeFalsy();
      expect(none.is_none()).toBeTruthy();
    });
  });

  it("can be used as return values", () => {
    function returns_some(): Option<number> {
      return some;
    }

    some = returns_some();
    if (some.is_some()) {
      expect(some.value).toBe(123);
    }

    function returns_none(): Option<number> {
      return None();
    }

    none = returns_none();
    if (none.is_none()) {
      expect(none).not.toHaveProperty("value");
    }
  });

  describe(".unwrap", () => {
    it("works well", () => {
      expect(some.unwrap()).toBe(123);
      expect(() => none.unwrap()).toThrow("unexpected unwrap");
    });
  });

  describe(".unwrap_or", () => {
    it("works correctly", () => {
      expect(some.unwrap_or(456)).toBe(123);
      expect(none.unwrap_or(456)).toBe(456);
    });
  });
});
