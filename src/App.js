import ChristmasEvent from "./Controller/ChristmasEvent.js";

class App {
  async run() {
    await ChristmasEvent.init();
  }
}

export default App;
