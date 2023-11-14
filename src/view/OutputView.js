import { Console } from "@woowacourse/mission-utils";
import { EVENT } from "../constants/event.js";

const OutputView = {
  printBlankLine() {
    Console.print("");
  },

  printNull() {
    Console.print("없음");
    this.printBlankLine();
  },

  printIntro(date) {
    Console.print(`12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`);
    this.printBlankLine();
  },

  printMenu(menu) {
    Console.print("<주문 메뉴>");

    if (!menu) {
      return this.printNull();
    }

    const menus = Object.entries(menu);
    const menuStrings = menus.map(([name, count]) => `${name} ${count}개`);

    menuStrings.forEach((string) => Console.print(string));
    this.printBlankLine();
  },

  printAmountBeforeDiscount(amount) {
    Console.print("<할인 전 총주문 금액>");
    Console.print(`${amount.toLocaleString()}원`);
    this.printBlankLine();
  },

  printGift(gift) {
    Console.print("<증정 메뉴>");

    if (!gift) {
      return this.printNull();
    }

    const [name, count] = Object.entries(gift)[0];

    Console.print(`${name} ${count}개`);
    this.printBlankLine();
  },

  printAppliedBenefit(appliedBenefit) {
    Console.print("<혜택 내역>");

    if (!appliedBenefit) {
      return this.printNull();
    }

    const benefits = Object.entries(appliedBenefit);
    const benefitStrings = benefits.map(
      ([benefitType, amount]) =>
        `${EVENT[benefitType]}: ${amount ? "-" : ""}${amount.toLocaleString()}원`
    );

    benefitStrings.forEach((string) => Console.print(string));

    this.printBlankLine();
  },

  printBenefitAmount(benefitAmount) {
    Console.print("<총혜택 금액>");
    Console.print(`${benefitAmount ? "-" : ""}${benefitAmount.toLocaleString()}원`);
    this.printBlankLine();
  },

  printAmountAfterDiscount(amount) {
    Console.print("<할인 후 예상 결제 금액>");
    Console.print(`${amount.toLocaleString()}원`);
    this.printBlankLine();
  },

  printBadge(badge) {
    Console.print("<12월 이벤트 배지>");

    if (!badge) {
      return this.printNull();
    }

    Console.print(badge);
    this.printBlankLine();
  },
};

export default OutputView;
