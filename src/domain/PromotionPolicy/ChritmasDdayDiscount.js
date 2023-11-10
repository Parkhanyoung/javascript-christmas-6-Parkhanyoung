const ChristmasDdayDiscount = {
  START_DATE: 1,
  DISCOUNT_INCREMENT: 100,
  INITIAL_DISCOUNT: 1000,

  apply(bookingDate) {
    const targetDate = bookingDate.getDate();

    const discountMultiplier = targetDate - this.START_DATE;
    return this.INITIAL_DISCOUNT + this.DISCOUNT_INCREMENT * discountMultiplier;
  },
};

export default ChristmasDdayDiscount;
