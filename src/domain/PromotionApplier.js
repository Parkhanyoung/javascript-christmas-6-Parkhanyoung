import { MENU_NAME, PRICE_FOR_MENUNAME } from "../constants/menu.js";
import {
  ChristmasDdayDiscount,
  DailyDiscount,
  SpecialDiscount,
  BadgeEvent,
  GiftEvent,
} from "./PromotionPolicy/index.js";

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
    const countPerCategory = orders.getCountPerCategory();
    const discount = this.calculateDiscount(visitDate, countPerCategory);

    const orderAmount = orders.getAmount();
    const discountAmount = this.calculateValueAmount(discount);
    const eventResult = this.cacluateEvent(orderAmount, discountAmount);

    return {
      discount,
      eventResult,
    };
  },

  calculateDiscount(visitDate, countPerCategory) {
    const christmasDdayDiscount = ChristmasDdayDiscount.apply(visitDate);

    const dailyDiscount = DailyDiscount.apply(visitDate, countPerCategory);
    const [dailyDiscountType, dailyDiscountAMount] = Object.entries(dailyDiscount)[0];

    const specialDiscount = SpecialDiscount.apply(visitDate);

    return {
      christmasDdayDiscount,
      [dailyDiscountType]: dailyDiscountAMount,
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

  calculateValueAmount(object) {
    if (!object) return 0;

    const values = Object.values(object);
    const amount = values.reduce((sum, value) => sum + value, 0);
    return amount;
  },
};

export default PromotionApplier;
