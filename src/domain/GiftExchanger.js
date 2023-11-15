import { MENU_NAME, PRICE_FOR_MENUNAME } from "../constants/menu.js";

const GiftExchanger = {
  GIFT: {
    name: MENU_NAME.champagne,
    price: PRICE_FOR_MENUNAME[MENU_NAME.champagne],
    count: 1,
  },

  exchange(isGiftGiven) {
    const { name, count } = this.GIFT;

    if (!isGiftGiven) {
      return null;
    }

    const gift = { name, count };
    return gift;
  },

  generateBenefitReport(discount, isGiftGiven) {
    if (!discount && !isGiftGiven) {
      return null;
    }

    if (!isGiftGiven) {
      return discount;
    }

    const benefit = { ...discount, gift: this.GIFT.price };
    return benefit;
  },
};

export default GiftExchanger;
