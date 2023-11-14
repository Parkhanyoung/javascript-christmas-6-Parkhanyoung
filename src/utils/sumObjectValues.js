const sumObjectValues = (object) => {
  if (!object) return 0;

  const values = Object.values(object);
  const amount = values.reduce((sum, value) => sum + value, 0);
  return amount;
};

export { sumObjectValues };
