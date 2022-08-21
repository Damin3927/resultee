import { Option, Some, None } from "../src/option";

describe("Option", () => {
  let option: Option<number>;

  beforeEach(() => {
    option = Some(123);
  });

  it("has a correct method is_some()", () => {
    expect(option.is_some()).toBeTruthy();
  });

  it("has a correct method is_none()", () => {
    expect(option.is_none()).toBeFalsy();
  });

  it("can be used as return values", () => {
    function returns_some(): Option<number> {
      return option;
    }

    const some = returns_some();
    if (some.is_some()) {
      expect(some.value).toBe(123);
    }

    function returns_none(): Option<number> {
      return None();
    }

    const none = returns_none();
    if (none.is_none()) {
      expect(none).not.toHaveProperty("value");
    }
  });

  describe(".unwrap", () => {
    it("has correct behaviours", () => {
      const some = Some("abc");
      expect(some.unwrap()).toBe("abc");

      const none: Option<string> = None();
      expect(() => none.unwrap()).toThrow("unexpected unwrap");
    });
  });
});
