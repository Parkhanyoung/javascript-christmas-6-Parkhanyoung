import BadgeEvent from "../src/domain/PromotionPolicy/BadgeEvent.js";
import ChristmasDdayDiscount from "../src/domain/PromotionPolicy/ChritmasDdayDiscount.js";
import DailyDiscount from "../src/domain/PromotionPolicy/DailyDiscount.js";
import GiftEvent from "../src/domain/PromotionPolicy/GiftEvent.js";
import SpecialDiscount from "../src/domain/PromotionPolicy/SpecialDiscount.js";

describe("이벤트 정책에 대한 테스트", () => {
  describe("크리스마스 디데이 할인 정책에 대한 테스트", () => {
    test.each([
      [new Date("2023-12-06"), 1500],
      [new Date("2023-12-12"), 2100],
      [new Date("2023-12-24"), 3300],
      [new Date("2023-12-30"), 0],
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

  describe("배지 증정 이벤트 정책에 대한 테스트", () => {
    test.each([
      [5000, "별"],
      [8900, "별"],
      [10_000, "트리"],
      [17_000, "트리"],
      [20_000, "산타"],
      [190_000, "산타"],
      [3000, null],
    ])("총 혜택 금액에 맞게 배지 유형을 계산한다. %s - %s", (amount, badgeType) => {
      expect(BadgeEvent.apply(amount)).toBe(badgeType);
    });
  });

  describe("샴페인 증정 이벤트 정책에 대한 테스트", () => {
    test.each([
      [100_000, false],
      [200_000, true],
      [20_000, false],
    ])("총 주문 금액에 맞게 샴페인 증정 여부를 계산한다. %s - %s", (orderAmount, isApplicable) => {
      expect(GiftEvent.apply(orderAmount)).toBe(isApplicable);
    });
  });
});
