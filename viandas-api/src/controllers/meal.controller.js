
const { createError } = require('../utils/errors');
const StatusCodes = require('http-status-codes');
const mealService = require('../services/meal.service');

const createMealSchema = require('../validators/create.meal.schema');

const getMeals = async (req, res) => {
    try {
        let meals = await mealService.getMealsByCategory(req.query);
        res.status(StatusCodes.OK).json(meals);
    } catch (error) {
        res.status(error.code || 500).json(createError(error.message, error.message));
    }
}


const createMeal = async (req, res) => {
    const { body } = req;
    if (!body) {
        res.status(StatusCodes.BAD_REQUEST).json(createError("bad_request", "Invalid body"));
        return
    }

    const { error } = createMealSchema.validate(body);
    if (error) {
        const errorMensage = error.details[0].message;
        res.status(StatusCodes.BAD_REQUEST).json(createError("bad_request", errorMensage));
        return
    }
    const { name, price, category } = body;

    try {
        const newMeal = await mealService.createMeal(name, price, category);
        res.status(StatusCodes.CREATED).json(newMeal);
    }catch (error) {
        res.status(error.code || 500).json(createError(error.message, error.message));
    }
}

module.exports = { getMeals, createMeal };