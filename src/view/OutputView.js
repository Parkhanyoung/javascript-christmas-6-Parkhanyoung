import { Console } from "@woowacourse/mission-utils";
import { EVENT } from "../constants/event.js";
import { CONSOLE_MESSAGE } from "../constants/messages.js";

const OutputView = {
  printBlankLine() {
    Console.print(CONSOLE_MESSAGE.blank);
  },

  printNull() {
    Console.print(CONSOLE_MESSAGE.null);
    this.printBlankLine();
  },

  printIntro(date) {
    Console.print(CONSOLE_MESSAGE.resultIntro(date));
    this.printBlankLine();
  },

  printMenu(menu) {
    Console.print("<주문 메뉴>");

    if (!menu) {
      return this.printNull();
    }

    const menus = Object.entries(menu);
    const menuStrings = menus.map(([name, count]) => CONSOLE_MESSAGE.menuInfo(name, count));

    menuStrings.forEach((string) => Console.print(string));
    this.printBlankLine();
  },

  printAmountBeforeDiscount(amount) {
    Console.print(CONSOLE_MESSAGE.amountBeforeDiscountTitle);
    Console.print(CONSOLE_MESSAGE.won(amount));
    this.printBlankLine();
  },

  printGift(gift) {
    Console.print(CONSOLE_MESSAGE.giftTitle);

    if (!gift) {
      return this.printNull();
    }

    Console.print(CONSOLE_MESSAGE.giftInfo(gift));
    this.printBlankLine();
  },

  printAppliedBenefit(appliedBenefit) {
    Console.print(CONSOLE_MESSAGE.appliedBenefitTitle);

    if (!appliedBenefit) {
      return this.printNull();
    }

    const benefits = Object.entries(appliedBenefit);
    const benefitStrings = benefits.map(
      ([benefitType, amount]) =>
        `${EVENT[benefitType]}: ${CONSOLE_MESSAGE.wonWithNegativeSign(amount)}`
    );

    benefitStrings.forEach((string) => Console.print(string));

    this.printBlankLine();
  },

  printBenefitAmount(benefitAmount) {
    Console.print(CONSOLE_MESSAGE.benefitAmountTitle);
    Console.print(`${CONSOLE_MESSAGE.wonWithNegativeSign(benefitAmount)}`);
    this.printBlankLine();
  },

  printAmountAfterDiscount(amount) {
    Console.print(CONSOLE_MESSAGE.amountAfterDiscountTitle);
    Console.print(CONSOLE_MESSAGE.won(amount));
    this.printBlankLine();
  },

  printBadge(badge) {
    Console.print(CONSOLE_MESSAGE.badgeTitle);

    if (!badge) {
      return this.printNull();
    }

    Console.print(badge);
    this.printBlankLine();
  },
};

export default OutputView;
