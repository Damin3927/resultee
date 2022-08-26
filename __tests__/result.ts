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

  describe(".isOk", () => {
    it("works well", () => {
      expect(ok.isOk()).toBeTruthy();
      expect(err.isOk()).toBeFalsy();
    });
  });

  describe(".isOkAnd", () => {
    it("works well", () => {
      expect(ok.isOkAnd((v) => v >= 100)).toBeTruthy();
      expect(ok.isOkAnd((v) => v >= 200)).toBeFalsy();
      expect(err.isOkAnd((v) => v >= 100)).toBeFalsy();
    });
  });

  describe(".isErr", () => {
    it("has a correct method is_err()", () => {
      expect(ok.isErr()).toBeFalsy();
      expect(err.isErr()).toBeTruthy();
    });
  });

  describe(".isErrAnd", () => {
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

  describe(".mapOr", () => {
    it("works well", () => {
      expect(ok.mapOr("0", (value) => String(value))).toBe("123");
      expect(err.mapOr("0", (value) => String(value))).toEqual("0");
    });
  });

  describe(".mapOrElse", () => {
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

  describe(".inspect", () => {
    it("works well", () => {
      let tmp: number = 0;
      ok.inspect((v) => (tmp = v));
      expect(tmp).toBe(123);
      err.inspect((_v) => (tmp = 0));
      expect(tmp).toBe(123);
    });
  });

  describe(".inspectErr", () => {
    it("works well", () => {
      let tmp: MyError = MyError.AnotherError;
      ok.inspectErr((e) => (tmp = e));
      expect(tmp).toBe(MyError.AnotherError);
      err.inspectErr((e) => (tmp = e));
      expect(tmp).toBe(MyError.CustomError);
    });
  });
});
