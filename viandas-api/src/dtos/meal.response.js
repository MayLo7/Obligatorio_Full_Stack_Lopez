const buildMealResponse = meal => {
    return {
        name: meal.name,
        price: meal.price
    }
}

module.exports = { buildMealResponse };