const BadgeEvent = {
  BADGE_THRESHOLD: [
    { min: 5000, max: 9999, badgeType: "별" },
    { min: 10_000, max: 19_999, badgeType: "트리" },
    { min: 20_000, max: null, badgeType: "산타" },
  ],

  apply(benefitAmount) {
    const badgeType = this.getBadgeType(benefitAmount);
    return badgeType;
  },

  getBadgeType(benefitAmount) {
    return this.BADGE_THRESHOLD.reduce((acc, { min, max, badgeType }) => {
      const isInRange = min <= benefitAmount && (!max || benefitAmount <= max);
      return isInRange ? badgeType : acc;
    }, null);
  },
};

export default BadgeEvent;
