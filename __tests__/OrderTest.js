import { MENU_CATEGORY, MENU_NAME } from "../src/constants/menu.js";
import Order from "../src/domain/Order.js";

describe("Order 클래스에 대한 테스트", () => {
  describe("주문 내역을 알맞게 변환한다.", () => {
    const getOrder = (menuName, count, amount, category) => ({ menuName, count, amount, category });

    const appetizerOrder = getOrder(MENU_NAME.mushroomSoup, 2, 12_000, MENU_CATEGORY.appetizer);
    const mainOrder = getOrder(MENU_NAME.barbecueRibs, 3, 162_000, MENU_CATEGORY.main);
    const dessertOrder = getOrder(MENU_NAME.chocolateCake, 1, 15_000, MENU_CATEGORY.dessert);
    const drinkOrder = getOrder(MENU_NAME.champagne, 6, 150_000, MENU_CATEGORY.drink);

    const testCases = [appetizerOrder, mainOrder, dessertOrder, drinkOrder].map((order) => {
      const { menuName, count } = order;
      const orderInput = `${menuName}-${count}`;
      return [orderInput, order];
    });

    test.each(testCases)("%s -> %s", (orderInput, order) => {
      expect(new Order(orderInput).getDetail()).toEqual(order);
    });
  });

  const getOrderInput = (menuName, count) => `${menuName}-${count}`;
  describe("메뉴판에 없는 메뉴가 들어올 경우 예외 처리한다.", () => {
    const wrongInputs = [
      getOrderInput("크림수프", 3),
      getOrderInput("양갈비스테이크", 2),
      getOrderInput("크림브륄레", 4),
      getOrderInput("고량주", 2),
    ];
    test.each(wrongInputs)("%s -> error", (orderInput) => {
      expect(() => new Order(orderInput)).toThrow("[ERROR]");
    });
  });

  describe("부적절한 메뉴 개수에 대해 예외 처리한다.", () => {
    const wrongInputs = [
      getOrderInput(MENU_NAME.caesarSalad, 0),
      getOrderInput(MENU_NAME.barbecueRibs, -2),
      getOrderInput(MENU_NAME.chocolateCake, -100),
    ];
    test.each(wrongInputs)("%s -> error", (orderInput) => {
      expect(() => new Order(orderInput)).toThrow("[ERROR]");
    });
  });

  describe("형식에 어긋나는 입력값에 대해 예외 처리한다.", () => {
    const wrongInputs = ["티본 스테이크-1", "티본스테이크 - 1", "티본스테이크 1", "티본스테이크1"];
    test.each(wrongInputs)("%s -> error", (orderInput) => {
      expect(() => new Order(orderInput)).toThrow("[ERROR]");
    });
  });
});
