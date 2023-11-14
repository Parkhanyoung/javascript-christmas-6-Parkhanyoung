import InputView from "../view/InputView.js";
import DecemberDate from "../domain/DecemberDate.js";
import OrdersParser from "../domain/OrdersParser.js";
import Orders from "../domain/Orders.js";
import Order from "../domain/Order.js";
import Receipt from "../domain/Receipt.js";
import OutputView from "../view/OutputView.js";
import { tryUntillSuccess } from "../utils/tryUntillSuccess.js";

const ChristmasEvent = {
  async init() {
    const date = await tryUntillSuccess(this.getDateFromUser)();
    const orders = await tryUntillSuccess(this.getOrdersFromUser)();

    const orderResult = this.getOrderResult(date, orders);
    this.printOrderResult(date, orderResult);
  },

  async getDateFromUser() {
    const input = await InputView.readDate();

    return new DecemberDate(input).getValue();
  },

  async getOrdersFromUser() {
    const input = await InputView.readOrders();
    const parsedOrderInput = await OrdersParser.parse(input);
    const orders = parsedOrderInput.map((order) => new Order(order));

    return new Orders(orders);
  },

  getOrderResult(date, orders) {
    const receipt = new Receipt(date, orders).getDetail();
    return receipt;
  },

  printOrderResult(date, orderResult) {
    OutputView.printIntro(date.getDate());
    OutputView.printMenu(orderResult.orderedMenu);
    OutputView.printAmountBeforeDiscount(orderResult.amountBeforeDiscount);
    OutputView.printGift(orderResult.gift);
    OutputView.printAppliedBenefit(orderResult.appliedBenefit);
    OutputView.printBenefitAmount(orderResult.benefitAmount);
    OutputView.printAmountAfterDiscount(orderResult.amountAfterDiscount);
    OutputView.printBadge(orderResult.badge);
  },
};

export default ChristmasEvent;
