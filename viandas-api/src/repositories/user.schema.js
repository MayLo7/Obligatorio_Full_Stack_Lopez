const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    plan: { type: String, enum: ['plus', 'premium'], default: 'plus', required: true },
    orderCount: { type: Number, default: 0 },
})

module.exports = userSchema;