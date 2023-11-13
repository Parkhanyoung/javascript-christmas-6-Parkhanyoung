import { MENU_NAME, PRICE_FOR_MENUNAME } from "../constants/menu.js";
import PromotionApplier from "./PromotionApplier.js";

class Receipt {
  static #GIFT = {
    name: MENU_NAME.champagne,
    price: PRICE_FOR_MENUNAME[MENU_NAME.champagne],
    count: 1,
  };

  #orders;
  #promotion;

  constructor(visitDate, orders) {
    const promotion = PromotionApplier.apply(visitDate, orders);

    this.#orders = orders;
    this.#promotion = promotion;
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
    const isGiven = this.#promotion.eventResult?.isGiftGiven;
    const { name, count } = Receipt.#GIFT;
    const gift = { [name]: count };

    return isGiven ? gift : null;
  }

  #getAppliedBenefit() {
    const { discount } = this.#promotion;

    const benefit = { ...discount };

    const isGiven = this.#promotion.eventResult?.isGiftGiven;

    if (isGiven) {
      benefit.gift = Receipt.#GIFT.price;
    }

    if (!discount && !isGiven) return null;

    return benefit;
  }

  #getAmountAfterDiscount() {
    const { discount } = this.#promotion;
    const discountAmount = PromotionApplier.calculateValueAmount(discount);
    const amountBeforeDiscount = this.#getAmountBeforeDiscount();
    return amountBeforeDiscount - discountAmount;
  }

  #getBenefitAmount() {
    const benefit = this.#getAppliedBenefit();
    const benefitAmount = PromotionApplier.calculateValueAmount(benefit);
    return benefitAmount;
  }

  #getBadge() {
    const badge = this.#promotion.eventResult?.eventBadge;

    if (!badge) return null;

    return badge;
  }
}

export default Receipt;
