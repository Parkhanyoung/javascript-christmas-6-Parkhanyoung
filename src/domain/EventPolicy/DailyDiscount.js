import { DAY } from "../../constants/date.js";
import { EVENT_TYPE } from "../../constants/event.js";
import { MENU_CATEGORY } from "../../constants/menu.js";

const DailyDiscount = {
  DISCOUNT_PER_MENU: 2023,

  apply(visitDate, countPerCategory) {
    const dessertCount = countPerCategory[MENU_CATEGORY.dessert] || 0;
    const mainCount = countPerCategory[MENU_CATEGORY.main] || 0;

    const isWeekend = this.checkIsWeekend(visitDate);
    const weekdayDiscount = this.DISCOUNT_PER_MENU * dessertCount;
    const weekendDiscount = this.DISCOUNT_PER_MENU * mainCount;

    return isWeekend
      ? { type: EVENT_TYPE.weekendDiscount, amount: weekendDiscount }
      : { type: EVENT_TYPE.weekdayDiscount, amount: weekdayDiscount };
  },

  checkIsWeekend(date) {
    const day = date.getDay();

    return day === DAY.friday || day === DAY.saturday;
  },
};

export default DailyDiscount;
