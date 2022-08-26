import { Err, Ok, Result } from "../src/result";

enum MyError {
  CustomError,
  AnotherError,
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

  describe(".is_ok_and", () => {
    it("works well", () => {
      expect(ok.is_ok_and((v) => v >= 100)).toBeTruthy();
      expect(ok.is_ok_and((v) => v >= 200)).toBeFalsy();
      expect(err.is_ok_and((v) => v >= 100)).toBeFalsy();
    });
  });

  describe(".is_err", () => {
    it("has a correct method is_err()", () => {
      expect(ok.is_err()).toBeFalsy();
      expect(err.is_err()).toBeTruthy();
    });
  });

  describe(".is_err_and", () => {
    it("works well", () => {
      expect(err.is_err_and((e) => e == MyError.CustomError)).toBeTruthy();
      expect(err.is_err_and((e) => e == MyError.AnotherError)).toBeFalsy();
      expect(ok.is_err_and((e) => e == MyError.CustomError)).toBeFalsy();
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

  describe(".map", () => {
    it("works well", () => {
      expect(ok.map((value) => String(value)).unwrap()).toBe("123");
      expect(err.map((value) => String(value))).toEqual(
        Err(MyError.CustomError)
      );
    });
  });

  describe(".map_or", () => {
    it("works well", () => {
      expect(ok.map_or("0", (value) => String(value))).toBe("123");
      expect(err.map_or("0", (value) => String(value))).toEqual("0");
    });
  });
});
