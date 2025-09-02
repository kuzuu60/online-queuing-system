const { v4: uuidv4 } = require('uuid');

function generateApplicationId() {
    return `APP-${uuidv4()}`; // Example: APP-550e8400-e29b-41d4-a716-446655440000
}

module.exports = generateApplicationId;
