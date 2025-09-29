const { StatusCodes} = require('http-status-codes');
const buildMealDTOResponse = require('../dtos/meal.response.js');
const Meal = require('../models/meal.model');

const findMealById = async (mealId) => {
    try {
        const meal = await findMealByIdInDB(mealId);
        return buildMealDTOResponse(meal);
    }catch (error) {
        throw error;
    }
}

const findMealByIdInDB = async (mealId) => {
    let meal;
    try {
        meal = await Meal.findById(mealId);
    }catch (e) {
        let error = new Error("Error obteniendo datos de la base");
        error.status = "internal_servicer_error",
        error.code = StatusCodes.INTERNAL_SERVER_ERROR;
        throw error;
    }

    if (!meal) {
        let error = new Error("Meal not found");
        error.status = "not_found";
        error.code = StatusCodes.NOT_FOUND;
        throw error;
    }
    return meal;
}

const getMealsByCategory = async (queryParams) => {
    try {
        let query = {};
        if (queryParams.category) {
            query.category = queryParams.category;
        }

        const mealsDB = await Meal.find(query);
        let mealsResponse = mealsDB.map(m => {
            return buildMealDTOResponse(m);
        });
        return mealsResponse;
    } catch (e) {
        let error = new Error("Error obteniendo datos de la base");
        error.status = "internal_servicer_error",
        error.code = StatusCodes.INTERNAL_SERVER_ERROR;
        throw error;
    }
}

module.exports = { findMealById, getMealsByCategory };