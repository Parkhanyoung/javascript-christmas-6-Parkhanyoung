import { sumObjectValues } from "../utils/sumObjectValues.js";
import EventApplier from "./EventApplier.js";
import GiftExchanger from "./GiftExchanger.js";

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
    const gift = this.#eventResult.giving?.gift || null;
    return gift;
  }

  #getAppliedBenefit() {
    const discount = this.#eventResult?.discount;
    const isGiftGiven = Boolean(this.#getGift());

    const appliedBenefit = GiftExchanger.generateBenefitReport(discount, isGiftGiven);
    return appliedBenefit;
  }

  #getBenefitAmount() {
    const benefit = this.#getAppliedBenefit();

    const benefitAmount = sumObjectValues(benefit);
    return benefitAmount;
  }

  #getAmountAfterDiscount() {
    const { discount } = this.#eventResult;
    const discountAmount = sumObjectValues(discount);

    const amountBeforeDiscount = this.#getAmountBeforeDiscount();

    return amountBeforeDiscount - discountAmount;
  }

  #getBadge() {
    const badge = this.#eventResult.giving?.badge || null;
    return badge;
  }
}

export default Receipt;
