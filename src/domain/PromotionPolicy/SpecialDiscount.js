import { DAY } from "../../constants/date.js";

const SpecialDiscount = {
  DISCOUNT_AMOUNT: 1000,

  apply(visitDate) {
    const isApplicable = this.checkIsApplicable(visitDate);
    return isApplicable ? this.DISCOUNT_AMOUNT : 0;
  },

  checkIsApplicable(date) {
    const isSunday = this.checkIsSunday(date);
    const isChristmas = this.checkIsChristmas(date);
    return isSunday || isChristmas;
  },

  checkIsSunday(date) {
    return date.getDay() === DAY.sunday;
  },

  checkIsChristmas(date) {
    const CHRISTMAS_DATE = 25;

    return date.getDate() === CHRISTMAS_DATE;
  },
};

export default SpecialDiscount;
