import { MENU_NAME, PRICE_FOR_MENUNAME } from "../constants/menu.js";
import EventApplier from "./EventApplier.js";

class Receipt {
  static #GIFT = {
    name: MENU_NAME.champagne,
    price: PRICE_FOR_MENUNAME[MENU_NAME.champagne],
    count: 1,
  };

  #orders;
  #eventResult;

  constructor(visitDate, orders) {
    const promotion = EventApplier.apply(visitDate, orders);

    this.#orders = orders;
    this.#eventResult = promotion;
  }

  getDetail() {
    return {
      orderedMenu: this.#getOrderedMenu(),
      amountBeforeDiscount: this.#getAmountBeforeDiscount(),
      gift: this.#getGift(),
      appliedBenefit: this.#getAppliedBenefit(),
      benefitAmount: this.#getBenefitAmount(),
      amountAfterDiscount: this.#getAmountAfterDiscount(),
      badge: this.#getBadge(),
    };
  }

  #getOrderedMenu() {
    return this.#orders.getCountPerMenuName();
  }

  #getAmountBeforeDiscount() {
    return this.#orders.getAmount();
  }

  #getGift() {
    const isGiven = this.#eventResult.giving?.isGiftGiven;
    const { name, count } = Receipt.#GIFT;
    const gift = { [name]: count };

    return isGiven ? gift : null;
  }

  #getAppliedBenefit() {
    const { discount } = this.#eventResult;

    const benefit = { ...discount };

    const isGiven = this.#eventResult.giving?.isGiftGiven;

    if (isGiven) {
      benefit.gift = Receipt.#GIFT.price;
    }

    if (!discount && !isGiven) return null;

    return benefit;
  }

  #getAmountAfterDiscount() {
    const { discount } = this.#eventResult;
    const discountAmount = EventApplier.calculateValueAmount(discount);
    const amountBeforeDiscount = this.#getAmountBeforeDiscount();
    return amountBeforeDiscount - discountAmount;
  }

  #getBenefitAmount() {
    const benefit = this.#getAppliedBenefit();
    const benefitAmount = EventApplier.calculateValueAmount(benefit);
    return benefitAmount;
  }

  #getBadge() {
    const badge = this.#eventResult.giving?.badge;

    if (!badge) return null;

    return badge;
  }
}

export default Receipt;
