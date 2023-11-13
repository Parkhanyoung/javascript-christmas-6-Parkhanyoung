import ChristmasPromotion from "./Controller/ChristmasPromotion.js";

class App {
  async run() {
    await ChristmasPromotion.init();
  }
}

export default App;
