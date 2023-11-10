import { DAY } from "../../constants/date.js";

const DailyDiscount = {
  DISCOUNT_PER_MENU: 2023,

  apply(bookingDate, menuCount) {
    const { dessert: dessertCount, main: mainCount } = menuCount;

    const isWeekend = this.checkIsWeekend(bookingDate);
    const weekDayDiscount = this.DISCOUNT_PER_MENU * dessertCount;
    const weekendDiscount = this.DISCOUNT_PER_MENU * mainCount;

    return isWeekend ? weekendDiscount : weekDayDiscount;
  },

  checkIsWeekend(date) {
    const day = date.getDay();

    return day === DAY.friday || day === DAY.saturday;
  },
};

export default DailyDiscount;
