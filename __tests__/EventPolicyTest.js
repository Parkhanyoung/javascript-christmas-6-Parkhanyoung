import { MENU_CATEGORY } from "../src/constants/menu.js";
import {
  BadgeGiving,
  ChristmasDdayDiscount,
  DailyDiscount,
  GiftGiving,
  SpecialDiscount,
} from "../src/domain/EventPolicy/index.js";

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
      [
        new Date("2023-12-10"),
        { [MENU_CATEGORY.dessert]: 3, [MENU_CATEGORY.main]: 2 },
        "weekdayDiscount",
        6069,
      ],
      [
        new Date("2023-12-16"),
        { [MENU_CATEGORY.dessert]: 5, [MENU_CATEGORY.main]: 2 },
        "weekendDiscount",
        4046,
      ],
      [
        new Date("2023-12-25"),
        { [MENU_CATEGORY.dessert]: 1, [MENU_CATEGORY.main]: 4 },
        "weekdayDiscount",
        2023,
      ],
    ])(
      "날짜와 주문한 메뉴 정보에 맞게 할인 금액을 계산한다. %s, %s - %s원",
      (date, menu, discountType, discountAmount) => {
        expect(DailyDiscount.apply(date, menu)).toEqual({
          type: discountType,
          amount: discountAmount,
        });
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
      expect(BadgeGiving.apply(amount)).toBe(badgeType);
    });
  });

  describe("샴페인 증정 이벤트 정책에 대한 테스트", () => {
    test.each([
      [100_000, false],
      [200_000, true],
      [20_000, false],
    ])("총 주문 금액에 맞게 샴페인 증정 여부를 계산한다. %s - %s", (orderAmount, isApplicable) => {
      expect(GiftGiving.apply(orderAmount)).toBe(isApplicable);
    });
  });
});
