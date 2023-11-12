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

export { ERROR_MESSAGE, DEV_ERROR_MESSAGE };
