import EventApplier from "./EventApplier.js";

class Receipt {
  #orders;
  #eventResult;

  constructor(visitDate, orders) {
    const eventResult = EventApplier.apply(visitDate, orders);

    this.#orders = orders;
    this.#eventResult = eventResult;
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
    const isGiftGiven = this.#eventResult.giving?.isGiftGiven;

    const gift = EventApplier.getGift(isGiftGiven);
    return gift;
  }

  #getAppliedBenefit() {
    const { discount } = this.#eventResult;
    const isGiftGiven = this.#eventResult.giving?.isGiftGiven;

    const appliedBenefit = EventApplier.getAppliedBenefit(discount, isGiftGiven);
    return appliedBenefit;
  }

  #getAmountAfterDiscount() {
    const { discount } = this.#eventResult;

    const amountBeforeDiscount = this.#getAmountBeforeDiscount();
    const discountAmount = EventApplier.calculateValueAmount(discount);

    return amountBeforeDiscount - discountAmount;
  }

  #getBenefitAmount() {
    const benefit = this.#getAppliedBenefit();

    const benefitAmount = EventApplier.calculateValueAmount(benefit);
    return benefitAmount;
  }

  #getBadge() {
    const badge = this.#eventResult.giving?.badge;

    if (!badge) {
      return null;
    }

    return badge;
  }
}

export default Receipt;
