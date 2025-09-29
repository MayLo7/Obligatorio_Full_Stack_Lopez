const buildMealResponse = meal => {
    return {
        id: meal._id,
        name: meal.name,
        price: meal.price,
        category: meal.category
    }
}

module.exports = buildMealResponse;