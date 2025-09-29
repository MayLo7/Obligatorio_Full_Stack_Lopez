const buildOrdermealResponse = ordermeal => {
    return {
        id: ordermeal._id,
        mealId: ordermeal.mealId,
        mealName: ordermeal.mealName,
        quantity: ordermeal.quantity,
        deliveryDate: ordermeal.deliveryDate,
        price: ordermeal.price,
        category: ordermeal.category
        
    }
}

module.exports = buildOrdermealResponse ;