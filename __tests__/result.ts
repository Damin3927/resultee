import { Ok, Result } from "../src/result";

enum MyError {
  CustomError,
}

describe("Result", () => {
  let result: Result<number, MyError>;

  beforeEach(() => {
    result = Ok(123);
  });

  it("has a correct method is_ok()", () => {
    expect(result.is_ok()).toBeTruthy();
  });

  it("has a correct method is_err()", () => {
    expect(result.is_err()).toBeFalsy();
  });

  it("can be used as return values", () => {
    function tmp(): Result<number, MyError> {
      return result;
    }

    const value = tmp();
    if (value.is_ok()) {
      expect(value.value).toBe(123);
    }
  });
});
