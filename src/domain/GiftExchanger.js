import { MENU_NAME, PRICE_FOR_MENUNAME } from "../constants/menu.js";

const GiftExchanger = {
  GIFT: {
    name: MENU_NAME.champagne,
    price: PRICE_FOR_MENUNAME[MENU_NAME.champagne],
    count: 1,
  },

  exchange(isGiftGiven) {
    if (!isGiftGiven) {
      return null;
    }

    return this.GIFT;
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
