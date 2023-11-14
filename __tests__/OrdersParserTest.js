import OrdersParser from "../src/domain/OrdersParser.js";

describe("OrdersParser 객체에 대한 테스트", () => {
  describe("올바르지 않은 입력값에 예외 처리한다.", () => {
    const WRONG_INPUT_1 = ["티본스테이크-1", "아이스크림-3"];
    const WRONG_INPUT_2 = 123;
    const WRONG_INPUT_3 = { menuName: "티본스테이크", count: 1 };

    test.each([WRONG_INPUT_1, WRONG_INPUT_2, WRONG_INPUT_3])("%s", (input) => {
      expect(() => OrdersParser.parse(input)).toThrow("[ERROR]");
    });
  });

  describe("올바른 입력값에 대해 배열 형태로 변환한다.", () => {
    const CASE_1 = ["해산물파스타-10", ["해산물파스타-10"]];
    const CASE_2 = ["티본스테이크-1,아이스크림-3", ["티본스테이크-1", "아이스크림-3"]];
    const CASE_3 = [
      "타파스-1,크리스마스파스타-2,레드와인-2",
      ["타파스-1", "크리스마스파스타-2", "레드와인-2"],
    ];

    test.each([CASE_1, CASE_2, CASE_3])("%s -> %s", (input, array) => {
      expect(OrdersParser.parse(input)).toEqual(array);
    });
  });
});
