const buildOrdermealResponse = ordermeal => {
    return {
        quantity: ordermeal.quantity,
        deliveryDate: ordermeal.deliveryDate,
        price: ordermeal.price,
        category: ordermeal.category
        //Tengo que devolver el nombre de la comida también
    }
}

module.exports = { buildOrdermealResponse };