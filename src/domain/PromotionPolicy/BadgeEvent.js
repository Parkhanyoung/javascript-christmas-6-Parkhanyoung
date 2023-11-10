const BadgeEvent = {
  BADGE_THRESHOLD: [
    { min: 5000, max: 9999, badgeType: "별" },
    { min: 10_000, max: 19_999, badgeType: "트리" },
    { min: 20_000, max: null, badgeType: "산타" },
  ],

  apply(amount) {
    const badgeType = this.getBadgeType(amount);
    return badgeType;
  },

  getBadgeType(amount) {
    return this.BADGE_THRESHOLD.reduce((acc, { min, max, badgeType }) => {
      const isInRange = min <= amount && (!max || amount <= max);
      return isInRange ? badgeType : acc;
    }, null);
  },
};

export default BadgeEvent;
