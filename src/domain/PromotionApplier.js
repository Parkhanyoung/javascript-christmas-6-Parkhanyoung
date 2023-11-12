import { MENU_NAME, PRICE_FOR_MENUNAME } from "../constants/menu.js";
import {
  ChristmasDdayDiscount,
  DailyDiscount,
  SpecialDiscount,
  BadgeEvent,
  GiftEvent,
} from "./PromotionPolicy";

const PromotionApplier = {
  MIN_ORDER_AMOUNT: 10_000,

  apply(visitDate, orders) {
    if (!this.isApplicable(orders)) {
      return {
        dicount: null,
        eventResult: null,
      };
    }

    const result = this.getDiscountAndEventResult(visitDate, orders);
    return result;
  },

  isApplicable(orders) {
    const orderAmount = orders.getAmount();
    return orderAmount >= this.MIN_ORDER_AMOUNT;
  },

  getDiscountAndEventResult(visitDate, orders) {
    const orderAmount = orders.getAmount();
    const countPerCategory = orders.getCountPerCategory();

    const discount = this.calculateDiscount(visitDate, countPerCategory);

    const discountAmount = this.calculateAmount(discount);
    const eventResult = this.cacluateEvent(orderAmount, discountAmount);

    return {
      discount,
      eventResult,
    };
  },

  calculateDiscount(visitDate, countPerCategory) {
    const christmasDdayDiscount = ChristmasDdayDiscount.apply(visitDate);
    const dailyDiscount = DailyDiscount.apply(visitDate, countPerCategory);
    const specialDiscount = SpecialDiscount.apply(visitDate);

    return {
      christmasDdayDiscount,
      dailyDiscount,
      specialDiscount,
    };
  },

  cacluateEvent(orderAmount, discountAmount) {
    const isGiftGiven = GiftEvent.apply(orderAmount);

    const GIFT_PRICE = PRICE_FOR_MENUNAME[MENU_NAME.champagne];
    const giftAmount = isGiftGiven ? GIFT_PRICE : 0;
    const benefitAmount = discountAmount + giftAmount;
    const eventBadge = BadgeEvent.apply(benefitAmount);

    return {
      isGiftGiven,
      eventBadge,
    };
  },

  calculateAmount(discount) {
    if (!discount) return 0;

    const discounts = Object.values(discount);
    const discountAmount = discounts.reduce((sum, discount) => sum + discount, 0);
    return discountAmount;
  },
};

export default PromotionApplier;
