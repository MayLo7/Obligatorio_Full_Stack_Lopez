const mongoose = require('mongoose');
const ordermealSchema = require('../repositories/ordermeal.schema');

const OrderMeal = mongoose.model('OrderMeal', ordermealSchema);

module.exports = OrderMeal;