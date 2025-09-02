let lastNumber = 0; // optionally fetch last number from DB on server start

function generateApplicationId() {
  const year = new Date().getFullYear();
  lastNumber += 1;
  return `APP-${year}-${String(lastNumber).padStart(3, '0')}`;
}

module.exports = generateApplicationId;
