const errorMessage = (message) => `[ERROR] ${message}`;

const ERROR_MESSAGE = {
  invalidOrder: errorMessage("유효하지 않은 주문입니다. 다시 입력해 주세요."),
  overMaxMenuCount: (maxCount) =>
    errorMessage(`메뉴는 한 번에 최대 ${maxCount}개까지만 주문할 수 있습니다.`),
};

export { ERROR_MESSAGE };
