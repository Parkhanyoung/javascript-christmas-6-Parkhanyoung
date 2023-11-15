import { ERROR_MESSAGE } from "../constants/messages.js";

class DecemberDate {
  static MIN_DATE = 1;
  static MAX_DATE = 31;

  #date;

  constructor(date) {
    DecemberDate.#testPositiveIntRegex(date);
    DecemberDate.#validateInNumberRange(date, DecemberDate.MIN_DATE, DecemberDate.MAX_DATE);

    const parsedDate = DecemberDate.#parse(date);

    this.#date = parsedDate;
  }

  getValue() {
    return this.#date;
  }

  static #parse(value) {
    const isLessThanTen = value < 10;
    const date = isLessThanTen ? `0${value}` : value;
    return new Date(`2023-12-${date}`);
  }

  static #testPositiveIntRegex(input) {
    const regex = /^[1-9]\d*$/;
    if (!regex.test(input)) {
      throw new Error(ERROR_MESSAGE.invalidDate);
    }
  }

  static #validateInNumberRange(value, minInclusive, maxInclusive) {
    if (value < minInclusive || maxInclusive < value) {
      throw new Error(ERROR_MESSAGE.invalidDate);
    }
  }
}

export default DecemberDate;
