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

  describe("올바른 날짜에 대해 12월 Date 객체로 변환한다.", () => {
    const CASE_1 = ["1", new Date("2023-12-01")];
    const CASE_2 = ["14", new Date("2023-12-14")];
    const CASE_3 = ["22", new Date("2023-12-22")];
    const CASE_4 = ["31", new Date("2023-12-31")];

    test.each([CASE_1, CASE_2, CASE_3, CASE_4])("%s -> %s", (input, date) => {
      expect(new DecemberDate(input).getValue()).toEqual(date);
    });
  });
});
