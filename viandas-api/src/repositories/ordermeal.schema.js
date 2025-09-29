const mongoose = require('mongoose');

const ordermealSchema = new mongoose.Schema({
    mealId: { type: mongoose.Schema.Types.ObjectId, ref: "Meals", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    quantity: { type: Number, required: true },
    deliveryDate: { type: Date, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    mealName: { type: String, required: true },
})

module.exports = ordermealSchema;