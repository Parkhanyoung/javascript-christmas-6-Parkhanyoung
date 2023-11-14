import { MENU_NAME, PRICE_FOR_MENUNAME } from "../constants/menu.js";
import {
  ChristmasDdayDiscount,
  DailyDiscount,
  SpecialDiscount,
  BadgeGiving,
  GiftGiving,
} from "./EventPolicy/index.js";

const EventApplier = {
  GIFT: {
    name: MENU_NAME.champagne,
    price: PRICE_FOR_MENUNAME[MENU_NAME.champagne],
    count: 1,
  },

  MIN_ORDER_AMOUNT: 10_000,

  apply(visitDate, orders) {
    if (!this.isApplicable(orders)) {
      return null;
    }

    const eventResult = this.getDiscountAndGiving(visitDate, orders);
    return eventResult;
  },

  getGift(isGiftGiven) {
    const { name, count } = this.GIFT;
    const gift = { [name]: count };

    if (!isGiftGiven) {
      return null;
    }

    return gift;
  },

  getAppliedBenefit(discount, isGiftGiven) {
    if (!discount && !isGiftGiven) {
      return null;
    }

    if (!isGiftGiven) {
      return discount;
    }

    const appliedBenefit = { ...discount, gift: this.GIFT.price };
    return appliedBenefit;
  },

  isApplicable(orders) {
    const orderAmount = orders.getAmount();

    return orderAmount >= this.MIN_ORDER_AMOUNT;
  },

  getDiscountAndGiving(visitDate, orders) {
    const countPerCategory = orders.getCountPerCategory();
    const discount = this.calculateDiscount(visitDate, countPerCategory);

    const orderAmount = orders.getAmount();
    const discountAmount = this.calculateValueAmount(discount);
    const giving = this.calculateGiving(orderAmount, discountAmount);

    return {
      discount,
      giving,
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

  calculateValueAmount(object) {
    if (!object) {
      return 0;
    }

    const values = Object.values(object);
    const amount = values.reduce((sum, value) => sum + value, 0);
    return amount;
  },
};

export default EventApplier;
