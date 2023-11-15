import { Console } from "@woowacourse/mission-utils";
import { CONSOLE_MESSAGE } from "../constants/messages.js";

const InputView = {
  async readDate() {
    const input = await Console.readLineAsync(
      "12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)" + "\n"
    );
    return input;
  },

  async readOrders() {
    const input = await Console.readLineAsync(CONSOLE_MESSAGE.readOrders);
    return input;
  },
};

export default InputView;
