import Order from "../src/domain/Order.js";
import Orders from "../src/domain/Orders.js";
import EventApplier from "../src/domain/EventApplier.js";

describe("EventApplier 객체에 대한 테스트", () => {
  describe("총 주문 금액이 10,000원 이하일 경우, 프로모션을 적용하지 않는다.", () => {
    const ORDERS_1 = new Orders([new Order("아이스크림-1")]);
    const ORDERS_2 = new Orders([new Order("타파스-1"), new Order("제로콜라-1")]);
    const ORDERS_3 = new Orders([new Order("양송이수프-1"), new Order("제로콜라-1")]);

    test.each([ORDERS_1, ORDERS_2, ORDERS_3])("Case %#", (orders) => {
      expect(EventApplier.apply(new Date("2023-12-12"), orders)).toEqual({
        discount: null,
        giving: null,
      });
    });
  });

  describe("이벤트(할인/증정) 적용 결과를 올바르게 계산한다.", () => {
    const CASE_1 = [
      new Date("2023-12-05"),
      new Orders([new Order("타파스-2"), new Order("티본스테이크-1")]),
      {
        discount: {
          christmasDdayDiscount: 1400,
          weekdayDiscount: 0,
          specialDiscount: 0,
        },
        giving: {
          gift: null,
          badge: null,
        },
      },
    ];

    const CASE_2 = [
      new Date("2023-12-24"),
      new Orders([
        new Order("양송이수프-3"),
        new Order("크리스마스파스타-2"),
        new Order("초코케이크-3"),
      ]),
      {
        discount: {
          christmasDdayDiscount: 3300,
          weekdayDiscount: 6069,
          specialDiscount: 1000,
        },
        giving: {
          gift: null,
          badge: "트리",
        },
      },
    ];

    const CASE_3 = [
      new Date("2023-12-31"),
      new Orders([
        new Order("시저샐러드-2"),
        new Order("바비큐립-2"),
        new Order("아이스크림-3"),
        new Order("레드와인-3"),
      ]),
      {
        discount: {
          christmasDdayDiscount: 0,
          weekdayDiscount: 6069,
          specialDiscount: 1000,
        },
        giving: {
          gift: {
            count: 1,
            name: "샴페인",
            price: 25_000,
          },
          badge: "산타",
        },
      },
    ];

    test.each([CASE_1, CASE_2, CASE_3])("Case %#", (date, orders, promotionResult) => {
      expect(EventApplier.apply(date, orders)).toEqual(promotionResult);
    });
  });
});
