const GiftEvent = {
  GIFT_THRESHOLD: 120_000,

  apply(orderAmount) {
    const isApplicable = this.checkIsOverThreshold(orderAmount);
    return isApplicable;
  },

  checkIsOverThreshold(orderAmount) {
    return this.GIFT_THRESHOLD <= orderAmount;
  },
};

export default GiftEvent;
