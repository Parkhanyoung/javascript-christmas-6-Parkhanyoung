import { MENU_NAME, PRICE_FOR_MENUNAME } from "../constants/menu.js";
import { sumObjectValues } from "../utils/sumObjectValues.js";
import {
  ChristmasDdayDiscount,
  DailyDiscount,
  SpecialDiscount,
  BadgeGiving,
  GiftGiving,
} from "./EventPolicy/index.js";

const EventApplier = {
  MIN_ORDER_AMOUNT: 10_000,

  apply(visitDate, orders) {
    if (!this.isApplicable(orders)) {
      return {
        dicount: null,
        giving: null,
      };
    }

    const result = this.getDiscountAndGiving(visitDate, orders);
    return result;
  },

  isApplicable(orders) {
    const orderAmount = orders.getAmount();
    return orderAmount >= this.MIN_ORDER_AMOUNT;
  },

  getDiscountAndGiving(visitDate, orders) {
    const countPerCategory = orders.getCountPerCategory();
    const discount = this.calculateDiscount(visitDate, countPerCategory);

    const orderAmount = orders.getAmount();
    const discountAmount = sumObjectValues(discount);
    const giving = this.calculateGiving(orderAmount, discountAmount);

    return {
      discount,
      giving,
    };
  },

  calculateDiscount(visitDate, countPerCategory) {
    const christmasDdayDiscount = ChristmasDdayDiscount.apply(visitDate);

    const dailyDiscount = DailyDiscount.apply(visitDate, countPerCategory);
    const { type: dailyDiscountType, amount: dailyDiscountAmount } = dailyDiscount;

    const specialDiscount = SpecialDiscount.apply(visitDate);

    return {
      christmasDdayDiscount,
      [dailyDiscountType]: dailyDiscountAmount,
      specialDiscount,
    };
  },

  calculateGiving(orderAmount, discountAmount) {
    const isGiftGiven = GiftGiving.apply(orderAmount);

    const GIFT_PRICE = PRICE_FOR_MENUNAME[MENU_NAME.champagne];

    const giftAmount = isGiftGiven ? GIFT_PRICE : 0;
    const benefitAmount = discountAmount + giftAmount;
    const badge = BadgeGiving.apply(benefitAmount);

    return {
      isGiftGiven,
      badge,
    };
  },
};

export default EventApplier;
