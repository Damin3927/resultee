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
      expect(ok.isOk()).toBeTruthy();
      expect(err.isOk()).toBeFalsy();
    });
  });

  describe(".is_ok_and", () => {
    it("works well", () => {
      expect(ok.isOkAnd((v) => v >= 100)).toBeTruthy();
      expect(ok.isOkAnd((v) => v >= 200)).toBeFalsy();
      expect(err.isOkAnd((v) => v >= 100)).toBeFalsy();
    });
  });

  describe(".is_err", () => {
    it("has a correct method is_err()", () => {
      expect(ok.isErr()).toBeFalsy();
      expect(err.isErr()).toBeTruthy();
    });
  });

  describe(".is_err_and", () => {
    it("works well", () => {
      expect(err.isErrAnd((e) => e == MyError.CustomError)).toBeTruthy();
      expect(err.isErrAnd((e) => e == MyError.AnotherError)).toBeFalsy();
      expect(ok.isErrAnd((e) => e == MyError.CustomError)).toBeFalsy();
    });
  });

  it("can be used as return values", () => {
    function tmp(): Result<number, MyError> {
      return ok;
    }

    const value = tmp();
    if (value.isOk()) {
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
      expect(ok.mapOr("0", (value) => String(value))).toBe("123");
      expect(err.mapOr("0", (value) => String(value))).toEqual("0");
    });
  });

  describe(".map_or_else", () => {
    it("works well", () => {
      const k = "0";
      expect(
        ok.mapOrElse(
          (_e) => k,
          (value) => String(value)
        )
      ).toBe("123");
      expect(
        err.mapOrElse(
          (_e) => k,
          (value) => String(value)
        )
      ).toEqual("0");
    });
  });
});
