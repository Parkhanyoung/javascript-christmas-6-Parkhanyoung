import { MENU_CATEGORY, MENU_NAME } from "../src/constants/menu";
import Order from "../src/domain/Order.js";
import Orders from "../src/domain/Orders";

const getOrder = (menuName, count) => new Order(`${menuName}-${count}`);
const getOrders = (ordersCase) =>
  ordersCase.map((order) => {
    const [menuName, count] = order;
    return getOrder(menuName, count);
  });

const case1 = [
  [MENU_NAME.mushroomSoup, 2],
  [MENU_NAME.barbecueRibs, 2],
];
const case2 = [
  [MENU_NAME.caesarSalad, 3],
  [MENU_NAME.christmasPasta, 2],
  [MENU_NAME.iceCream, 3],
  [MENU_NAME.champagne, 2],
];
const case3 = [
  [MENU_NAME.tapas, 5],
  [MENU_NAME.seafoodPasta, 1],
  [MENU_NAME.tBoneSteak, 2],
  [MENU_NAME.christmasPasta, 2],
  [MENU_NAME.chocolateCake, 1],
  [MENU_NAME.redWine, 1],
];

const orders1 = getOrders(case1);
const orders2 = getOrders(case2);
const orders3 = getOrders(case3);

describe("Orders 클래스에 대한 테스트", () => {
  describe("주문 내역에 관한 계산을 올바르게 처리한다.", () => {
    describe("주문한 메뉴 별 개수를 올바르게 계산한다.", () => {
      const getCountPerMenu = (ordersCase) =>
        ordersCase.reduce((orderCount, order) => {
          const [menuName, count] = order;
          return {
            ...orderCount,
            [menuName]: count,
          };
        }, {});

      const orderCount1 = getCountPerMenu(case1);
      const orderCount2 = getCountPerMenu(case2);
      const orderCount3 = getCountPerMenu(case3);

      test.each([
        [orders1, orderCount1],
        [orders2, orderCount2],
        [orders3, orderCount3],
      ])("%s -> %s", (orders, orderCount) => {
        expect(new Orders(orders).getCountPerMenuName()).toEqual(orderCount);
      });
    });

    describe("카테고리 별 주문 개수를 올바르게 계산한다.", () => {
      const categoryCount1 = {
        [MENU_CATEGORY.appetizer]: 2,
        [MENU_CATEGORY.main]: 2,
      };
      const categoryCount2 = {
        [MENU_CATEGORY.appetizer]: 3,
        [MENU_CATEGORY.main]: 2,
        [MENU_CATEGORY.dessert]: 3,
        [MENU_CATEGORY.drink]: 2,
      };
      const categoryCount3 = {
        [MENU_CATEGORY.appetizer]: 5,
        [MENU_CATEGORY.main]: 5,
        [MENU_CATEGORY.dessert]: 1,
        [MENU_CATEGORY.drink]: 1,
      };

      test.each([
        [orders1, categoryCount1],
        [orders2, categoryCount2],
        [orders3, categoryCount3],
      ])("%s -> %s", (orders, categoryCount) => {
        expect(new Orders(orders).getCountPerCategory()).toEqual(categoryCount);
      });
    });

    describe("주문 총 금액을 올바르게 계산한다.", () => {
      const ordersAmount1 = 120_000;
      const ordersAmount2 = 139_000;
      const ordersAmount3 = 297_500;

      test.each([
        [orders1, ordersAmount1],
        [orders2, ordersAmount2],
        [orders3, ordersAmount3],
      ])("%s -> %s", (orders, ordersAmount) => {
        expect(new Orders(orders).getAmount()).toBe(ordersAmount);
      });
    });
  });

  describe("", () => {
    describe("", () => {});
  });
});
