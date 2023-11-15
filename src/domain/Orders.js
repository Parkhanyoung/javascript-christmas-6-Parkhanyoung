import { MENU_CATEGORY } from "../constants/menu.js";
import { DEV_ERROR_MESSAGE, ERROR_MESSAGE } from "../constants/messages.js";
import Order from "./Order.js";

class Orders {
  static #MAX_ORDER_COUNT = 20;

  #orders;

  constructor(orders) {
    Orders.#validateIsValidArray(orders);
    Orders.#validateOrderInstances(orders);

    const totalOrderCount = Orders.#getTotalOrderCount(orders);

    Orders.#validateTotalOrderCount(totalOrderCount);
    Orders.#validateNotOnlyDrink(orders);
    Orders.#validateNoDuplicate(orders);

    this.#orders = orders;
  }

  getCountPerMenuName() {
    return Orders.#countOrdersByMenuName(this.#orders);
  }

  getCountPerCategory() {
    return Orders.#countOrdersByCategory(this.#orders);
  }

  getAmount() {
    const totalAmount = this.#orders.reduce((totalAmount, order) => {
      const { amount } = order.getDetail();
      return totalAmount + amount;
    }, 0);

    return totalAmount;
  }

  static #validateIsValidArray(value) {
    return Array.isArray(value) && value.length > 0;
  }

  static #validateOrderInstances(array) {
    const isOrderInstances = array.every((element) => element instanceof Order);
    if (!isOrderInstances) {
      throw new Error(DEV_ERROR_MESSAGE.invalidElement);
    }
  }

  static #getTotalOrderCount(orders) {
    return orders.reduce((totalCount, order) => {
      const { count } = order.getDetail();
      return totalCount + count;
    }, 0);
  }

  static #validateTotalOrderCount(count) {
    if (Orders.#MAX_ORDER_COUNT < count) {
      throw new Error(ERROR_MESSAGE.overMaxOrderCount(Orders.#MAX_ORDER_COUNT));
    }
  }

  static #validateNotOnlyDrink(orders) {
    const countPerCategory = this.#countOrdersByCategory(orders);
    const categories = Object.keys(countPerCategory);

    const isOnlyDrink = categories.length === 1 && categories[0] === MENU_CATEGORY.drink;
    if (isOnlyDrink) {
      throw new Error(ERROR_MESSAGE.invalidOrder);
    }
  }

  static #validateNoDuplicate(orders) {
    const menuNames = orders.map((order) => {
      const { menuName } = order.getDetail();
      return menuName;
    });

    const hasDuplicate = new Set(menuNames).size !== menuNames.length;
    if (hasDuplicate) {
      throw new Error(ERROR_MESSAGE.invalidOrder);
    }
  }

  static #countOrdersByMenuName(orders) {
    const countPerMenuName = orders.reduce((result, order) => {
      const { menuName, count } = order.getDetail();

      return { ...result, [menuName]: count };
    }, {});

    return countPerMenuName;
  }

  static #countOrdersByCategory(orders) {
    const countPerCategory = orders.reduce((result, order) => {
      const { category, count } = order.getDetail();
      const existingCount = result[category] || 0;

      return { ...result, [category]: existingCount + count };
    }, {});

    return countPerCategory;
  }
}

export default Orders;
