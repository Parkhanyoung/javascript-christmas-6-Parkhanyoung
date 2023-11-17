const ChristmasDdayDiscount = {
  START_DATE: 1,
  D_DAY_DATE: 25,
  DISCOUNT_INCREMENT: 100,
  INITIAL_DISCOUNT: 1000,

  apply(visitDate) {
    const targetDate = visitDate.getDate();

    if (!this.checkIsBeforeDday(targetDate)) {
      return 0;
    }

    const discountMultiplier = targetDate - this.START_DATE;
    const totalIncrement = this.DISCOUNT_INCREMENT * discountMultiplier;

    return this.INITIAL_DISCOUNT + totalIncrement;
  },

  checkIsBeforeDday(date) {
    return this.D_DAY_DATE - date >= 0;
  },
};

export default ChristmasDdayDiscount;
