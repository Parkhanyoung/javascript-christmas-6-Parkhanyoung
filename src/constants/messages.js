const errorMessage = (message) => `[ERROR] ${message}`;

const ERROR_MESSAGE = {
  invalidOrder: errorMessage("유효하지 않은 주문입니다. 다시 입력해 주세요."),
  overMaxOrderCount: (maxCount) =>
    errorMessage(`한 번에 ${maxCount}개를 초과하여 주문할 수 없습니다.`),

  invalidDate: errorMessage("유효하지 않은 날짜입니다. 다시 입력해 주세요."),
};

// 개발적 이슈에 대한 에러 메시지
const DEV_ERROR_MESSAGE = {
  invalidElement: errorMessage("주어진 요소가 요구되는 타입에 부합하지 않습니다."),
};

const CONSOLE_MESSAGE = {
  // input
  readOrders:
    "주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)" +
    "\n",

  // output
  blank: "",
  null: "없음",
  resultIntro: (date) => `12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`,
  menuInfo: (name, count) => `${name} ${count}개`,
  amountBeforeDiscountTitle: "<할인 전 총주문 금액>",
  giftTitle: "<증정 메뉴>",
  giftInfo: ({ name, count }) => `${name} ${count}개`,
  appliedBenefitTitle: "<혜택 내역>",
  benefitAmountTitle: "<총혜택 금액>",
  amountAfterDiscountTitle: "<할인 후 예상 결제 금액>",
  negativeSign: (amount) => (amount === 0 ? "" : "-"),
  won: (amount) => `${amount.toLocaleString()}원`,
  wonWithNegativeSign: (amount) =>
    `${CONSOLE_MESSAGE.negativeSign(amount)}${CONSOLE_MESSAGE.won(amount)}`,
  badgeTitle: "<12월 이벤트 배지>",
};

export { ERROR_MESSAGE, DEV_ERROR_MESSAGE, CONSOLE_MESSAGE };
