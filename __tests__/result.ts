import { Err, Ok, Result } from "../src/result";

enum MyError {
  CustomError,
}

describe("Result", () => {
  let ok: Result<number, MyError>;
  let err: Result<number, MyError>;

  beforeEach(() => {
    ok = Ok(123);
    err = Err(MyError.CustomError);
  });

  describe(".is_ok", () => {
    it("works well", () => {
      expect(ok.is_ok()).toBeTruthy();
      expect(err.is_ok()).toBeFalsy();
    });
  });

  describe(".is_err", () => {
    it("has a correct method is_err()", () => {
      expect(ok.is_err()).toBeFalsy();
      expect(err.is_err()).toBeTruthy();
    });
  });

  it("can be used as return values", () => {
    function tmp(): Result<number, MyError> {
      return ok;
    }

    const value = tmp();
    if (value.is_ok()) {
      expect(value.value).toBe(123);
    }
  });

  describe(".unwrap", () => {
    it("works well", () => {
      expect(ok.unwrap()).toBe(123);
      expect(() => err.unwrap()).toThrow("unexpected unwrap");
    });
  });
});
