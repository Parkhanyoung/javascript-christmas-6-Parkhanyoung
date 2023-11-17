import { ERROR_MESSAGE } from "../constants/messages.js";

const OrdersParser = {
  parse(value) {
    this.validateIsString(value);

    const parsed = this.splitByComma(value);
    return parsed;
  },

  validateIsString(value) {
    if (typeof value !== "string") {
      throw Error(ERROR_MESSAGE.invalidOrder);
    }
  },

  splitByComma(input) {
    return input.split(",");
  },
};

export default OrdersParser;
