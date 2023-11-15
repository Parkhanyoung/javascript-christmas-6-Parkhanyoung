import { ERROR_MESSAGE } from "../constants/messages.js";
import { MENU, MENU_CATEGORIES, MENU_NAMES, PRICE_FOR_MENUNAME } from "../constants/menu.js";

class Order {
  static #MIN_COUNT = 1;

  #menuName;
  #count;

  constructor(input) {
    Order.#testOrderRegex(input);
    const { menuName, count } = Order.#parseInput(input);

    Order.#validateAvailableMenu(menuName);
    Order.#validateCount(count);

    this.#menuName = menuName;
    this.#count = count;
  }

  getDetail() {
    return {
      menuName: this.#menuName,
      count: this.#count,
      amount: this.#getAmount(),
      category: this.#getCategory(),
    };
  }

  static #testOrderRegex(input) {
    const orderRegex = /^([a-zA-Z가-힣]+)-(\d+)$/;
    if (!orderRegex.test(input)) {
      throw new Error(ERROR_MESSAGE.invalidOrder);
    }
  }

  static #parseInput(input) {
    const [menuName, count] = input.split("-");
    return { menuName, count: Number(count) };
  }

  static #validateAvailableMenu(value) {
    if (!MENU_NAMES.includes(value)) {
      throw new Error(ERROR_MESSAGE.invalidOrder);
    }
  }

  static #validateCount(value) {
    Order.#testPositiveIntRegex(value);
    Order.#validateNotLessThanMinCount(value);
  }

  static #testPositiveIntRegex(input) {
    const regex = /^[1-9]\d*$/;
    if (!regex.test(input)) {
      throw new Error(ERROR_MESSAGE.invalidOrder);
    }
  }

  static #validateNotLessThanMinCount(value) {
    if (Order.#MIN_COUNT > value) {
      throw new Error(ERROR_MESSAGE.invalidOrder);
    }
  }

  #getAmount() {
    const menuPrice = PRICE_FOR_MENUNAME[this.#menuName];
    return menuPrice * this.#count;
  }

  #getCategory() {
    const availableCategories = MENU_CATEGORIES;

    const foundCategory = availableCategories.reduce((foundCategory, currentCategory) => {
      const currentMenuNames = MENU[currentCategory].map(({ name }) => name);
      const menuNameIncluded = currentMenuNames.includes(this.#menuName);
      return menuNameIncluded ? currentCategory : foundCategory;
    }, undefined);

    return foundCategory;
  }
}

export default Order;
