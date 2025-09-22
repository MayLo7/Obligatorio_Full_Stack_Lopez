const mongoose = require('mongoose');
const mealSchema = require('../repositories/meal.schema');

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;