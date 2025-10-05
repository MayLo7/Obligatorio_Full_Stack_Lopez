const mongoose = require('mongoose');

const ordermealSchema = new mongoose.Schema({
    mealId: { type: mongoose.Schema.Types.ObjectId, ref: "Meal", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    quantity: { type: Number, required: true },
    deliveryDate: { type: Date, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    mealName: { type: String, required: true },
},
{ timestamps: true }
)

module.exports = ordermealSchema;