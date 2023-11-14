import DecemberDate from "../src/domain/DecemberDate.js";
import Order from "../src/domain/Order.js";
import Orders from "../src/domain/Orders.js";
import Receipt from "../src/domain/Receipt.js";

describe("Recipt 클래스에 대한 테스트", () => {
  describe("예시로 주어진 케이스와 동일하게 계산한다.", () => {
    const date1 = new DecemberDate("26").getValue();
    const orders1 = new Orders([new Order("타파스-1"), new Order("제로콜라-1")]);
    const receipt1 = new Receipt(date1, orders1);

    const date2 = new DecemberDate("3").getValue();
    const orders2 = new Orders([
      new Order("티본스테이크-1"),
      new Order("바비큐립-1"),
      new Order("초코케이크-2"),
      new Order("제로콜라-1"),
    ]);
    const receipt2 = new Receipt(date2, orders2);

    const result1 = {
      orderedMenu: { 타파스: 1, 제로콜라: 1 },
      amountBeforeDiscount: 8500,
      gift: null,
      appliedBenefit: null,
      benefitAmount: 0,
      amountAfterDiscount: 8500,
      badge: null,
    };

    const result2 = {
      orderedMenu: { 티본스테이크: 1, 바비큐립: 1, 초코케이크: 2, 제로콜라: 1 },
      amountBeforeDiscount: 142_000,
      gift: { name: "샴페인", count: 1 },
      appliedBenefit: {
        christmasDdayDiscount: 1200,
        weekdayDiscount: 4046,
        specialDiscount: 1000,
        gift: 25000,
      },
      benefitAmount: 31_246,
      amountAfterDiscount: 135_754,
      badge: "산타",
    };

    test.each([
      [receipt1, result1],
      [receipt2, result2],
    ])("Case %#", (receipt, result) => {
      expect(receipt.getDetail()).toEqual(result);
    });
  });
});
