import { Console } from "@woowacourse/mission-utils";

const tryUntillSuccess = (func) => {
  const repeatable = async (...args) => {
    while (true) {
      try {
        return await func(...args);
      } catch (error) {
        Console.print(error.message);
      }
    }
  };

  return repeatable;
};

export { tryUntillSuccess };
