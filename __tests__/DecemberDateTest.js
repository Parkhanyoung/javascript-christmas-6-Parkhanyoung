import DecemberDate from "../src/domain/DecemberDate";

describe("DecemberDate 클래스에 대한 테스트", () => {
  describe("올바르지 않은 날짜에 대해 예외 처리한다.", () => {
    const WRONG_INPUT_1 = "0";
    const WRONG_INPUT_2 = "32";
    const WRONG_INPUT_3 = "-3";
    const WRONG_INPUT_4 = "first";

    test.each([WRONG_INPUT_1, WRONG_INPUT_2, WRONG_INPUT_3, WRONG_INPUT_4])(
      "%s -> error",
      (input) => {
        expect(() => new DecemberDate(input)).toThrow("[ERROR]");
      }
    );
  });

  describe("올바른 날짜에 대해 숫자형으로 변환한다.", () => {
    const CASE_1 = ["1", 1];
    const CASE_2 = ["14", 14];
    const CASE_3 = ["22", 22];
    const CASE_4 = ["31", 31];

    test.each([CASE_1, CASE_2, CASE_3, CASE_4])("%s -> %s", (input, number) => {
      expect(new DecemberDate(input).getValue()).toBe(number);
    });
  });
});
