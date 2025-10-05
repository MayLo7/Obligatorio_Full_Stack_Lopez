const { create } = require("../models/user.model");

const buildOrdermealResponse = ordermeal => {
    return {
        id: ordermeal._id,
        mealId: ordermeal.mealId,
        mealName: ordermeal.mealName,
        quantity: ordermeal.quantity,
        deliveryDate: ordermeal.deliveryDate,
        price: ordermeal.price,
        category: ordermeal.category,
        created_date: ordermeal.createdAt,
        updated_date: ordermeal.updatedAt
        
    }
}

module.exports = buildOrdermealResponse ;