const EVENT_TYPE = {
  christmasDdayDiscount: "christmasDdayDiscount",
  weekdayDiscount: "weekdayDiscount",
  weekendDiscount: "weekendDiscount",
  specialDiscount: "specialDiscount",
  gift: "gift",
};

const EVENT = {
  [EVENT_TYPE.christmasDdayDiscount]: "크리스마스 디데이 할인",
  [EVENT_TYPE.weekdayDiscount]: "평일 할인",
  [EVENT_TYPE.weekendDiscount]: "주말 할인",
  [EVENT_TYPE.specialDiscount]: "특별 할인",
  [EVENT_TYPE.gift]: "증정 이벤트",
};

export { EVENT_TYPE, EVENT };
