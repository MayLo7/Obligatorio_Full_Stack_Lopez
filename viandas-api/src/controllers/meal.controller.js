const bd = require('../models/bd');
const { createError } = require('../utils/error');
const StatusCodes = require('http-status-codes');
const mealService = require('../services/meal.service');

const getMeals = async (req, res) => {
    try {
        let meals = await mealService.getMealsByCategory(req.query);
        res.status(StatusCodes.OK).json(meals);
    } catch (error) {
        res.status(error.code || 500).json(createError(error.message, error.message));
    }
}