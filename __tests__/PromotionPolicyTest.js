import ChristmasDdayDiscount from "../src/domain/PromotionPolicy/ChritmasDdayDiscount.js";

describe("이벤트 정책에 대한 테스트", () => {
  describe("Chritmas D-day 정책에 대한 테스트", () => {
    test.each([
      [new Date("2023-12-06"), 1500],
      [new Date("2023-12-12"), 2100],
      [new Date("2023-12-24"), 3300],
    ])("날짜에 맞게 알맞는 할인 금액을 반환한다. %s - %s", (date, discountAmount) => {
      expect(ChristmasDdayDiscount.apply(date)).toBe(discountAmount);
    });
  });
});
