import InputView from "../view/InputView.js";
import DecemberDate from "../domain/DecemberDate.js";
import OrdersParser from "../domain/OrdersParser.js";
import Orders from "../domain/Orders.js";
import Order from "../domain/Order.js";
import Receipt from "../domain/Receipt.js";
import OutputView from "../view/OutputView.js";

const ChristmasPromotion = {
  async init() {
    const dateInput = await InputView.readDate();
    const date = new DecemberDate(dateInput);

    const ordersInput = await InputView.readOrders();
    const parsedOrderInput = await OrdersParser.parse(ordersInput);
    const orders = parsedOrderInput.map((order) => new Order(order));
    const ordersObj = new Orders(orders);

    const receipt = new Receipt(date.getValue(), ordersObj).getDetail();
    const {
      orderedMenu,
      amountBeforeDiscount,
      gift,
      appliedBenefit,
      benefitAmount,
      amountAfterDiscount,
      badge,
    } = receipt;

    OutputView.printIntro();
    OutputView.printMenu(orderedMenu);
    OutputView.printAmountBeforeDiscount(amountBeforeDiscount);
    OutputView.printGift(gift);
    OutputView.printAppliedBenefit(appliedBenefit);
    OutputView.printBenefitAmount(benefitAmount);
    OutputView.printAmountAfterDiscount(amountAfterDiscount);
    OutputView.printBadge(badge);
  },
};

export default ChristmasPromotion;
