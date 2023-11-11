const MENU_CATEGORY = {
  appetizer: "에피타이저",
  main: "메인",
  dessert: "디저트",
  drink: "음료",
};

const MENU_NAME = {
  mushroomSoup: "양송이수프",
  tapas: "타파스",
  caesarSalad: "시저샐러드",
  tBoneSteak: "티본스테이크",
  barbecueRibs: "바비큐립",
  seafoodPasta: "해산물파스타",
  christmasPasta: "크리스마스파스타",
  chocolateCake: "초코케이크",
  iceCream: "아이스크림",
  zeroCoke: "제로콜라",
  redWine: "레드와인",
  champagne: "샴페인",
};

const MENU = {
  [MENU_CATEGORY.appetizer]: [
    { name: MENU_NAME.mushroomSoup, price: 6000 },
    { name: MENU_NAME.tapas, price: 5500 },
    { name: MENU_NAME.caesarSalad, price: 8000 },
  ],
  [MENU_CATEGORY.main]: [
    { name: MENU_NAME.tBoneSteak, price: 55_000 },
    { name: MENU_NAME.barbecueRibs, price: 54_000 },
    { name: MENU_NAME.seafoodPasta, price: 35_000 },
    { name: MENU_NAME.christmasPasta, price: 25_000 },
  ],
  [MENU_CATEGORY.dessert]: [
    { name: MENU_NAME.chocolateCake, price: 15_000 },
    { name: MENU_NAME.iceCream, price: 5000 },
  ],
  [MENU_CATEGORY.drink]: [
    { name: MENU_NAME.zeroCoke, price: 3000 },
    { name: MENU_NAME.redWine, price: 60_000 },
    { name: MENU_NAME.champagne, price: 25_000 },
  ],
};

const MENU_CATEGORIES = Object.values(MENU_CATEGORY);

const MENU_NAMES = Object.values(MENU).reduce((acc, menus) => {
  const menuNames = menus.map(({ name }) => name);
  return [...acc, ...menuNames];
}, []);

const WHOLE_MENUS = Object.values(MENU).flat();

const PRICE_FOR_MENUNAME = WHOLE_MENUS.reduce((acc, { name: menuName, price }) => {
  return {
    ...acc,
    [menuName]: price,
  };
}, {});

export { MENU_CATEGORY, MENU, MENU_CATEGORIES, MENU_NAME, MENU_NAMES, PRICE_FOR_MENUNAME };
