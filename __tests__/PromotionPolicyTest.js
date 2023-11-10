import ChristmasDdayDiscount from "../src/domain/PromotionPolicy/ChritmasDdayDiscount.js";
import DailyDiscount from "../src/domain/PromotionPolicy/DailyDiscount.js";
import SpecialDiscount from "../src/domain/PromotionPolicy/SpecialDiscount.js";

describe("이벤트 정책에 대한 테스트", () => {
  describe("크리스마스 디데이 할인 정책에 대한 테스트", () => {
    test.each([
      [new Date("2023-12-06"), 1500],
      [new Date("2023-12-12"), 2100],
      [new Date("2023-12-24"), 3300],
    ])("날짜에 맞게 할인 금액을 계산한다. %s - %s", (date, discountAmount) => {
      expect(ChristmasDdayDiscount.apply(date)).toBe(discountAmount);
    });
  });

  describe("Daily(평일/주말) 할인 정책에 대한 테스트", () => {
    test.each([
      [new Date("2023-12-10"), { dessert: 3, main: 2 }, 6069],
      [new Date("2023-12-16"), { dessert: 5, main: 2 }, 4046],
      [new Date("2023-12-25"), { dessert: 1, main: 4 }, 2023],
    ])(
      "날짜와 주문한 메뉴 정보에 맞게 할인 금액을 계산한다. %s, %s - %s원",
      (date, menu, discountAmount) => {
        expect(DailyDiscount.apply(date, menu)).toBe(discountAmount);
      }
    );
  });

  describe("특별 할인 정책에 대한 테스트", () => {
    test.each([
      [new Date("2023-12-10"), 1000],
      [new Date("2023-12-13"), 0],
      [new Date("2023-12-16"), 0],
      [new Date("2023-12-25"), 1000],
    ])("날짜에 맞게 할인 금액을 계산한다. %s - %s", (date, discountAmount) => {
      expect(SpecialDiscount.apply(date)).toBe(discountAmount);
    });
  });
});
