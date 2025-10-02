const bd = require('../models/bd');
const { createError } = require('../utils/error');
const StatusCodes = require('http-status-codes');
const createOrdermealSchema = require('../validators/create.ordermeal.schema');
const updateOrdermealSchema = require('../validators/update.ordermeal.schema');

const ordermealService = require('../services/ordermeal.service');

const getOrdermeals = async (req, res) => {
    try {
        let Ordermeals = await ordermealService.getOrdermealsByUserId(req.userId, req.query);
        res.status(StatusCodes.OK).json(Ordermeals);
    }catch (error) {
        res.status(error.code || 500).json(createError(error.message, error.message));
    }
}

const getOrdermealById = async (req, res) => {
    const ordermealId = req.params.id;

    try {
        const ordermeal = await ordermealService.findOrdermealById(ordermealId, req.userId);
        res.status(StatusCodes.OK).json(ordermeal);
    }catch (error) {
        res.status(error.code || 500).json(createError(error.message, error.message));
    }
}

const deleteOrdermeal = async (req, res) => {
    const ordermealId = req.params.id;
    try {
        await ordermealService.deleteOrdermeal(ordermealId, req.userId);
        res.status(StatusCodes.NO_CONTENT).send();
    }catch (error) {
        res.status(error.code || 500).json(createError(error.message, error.message));
    }
}

const createOrdermeal = async (req, res) => {
    const { body } = req;
    if (!body) {
        res.status(StatusCodes.BAD_REQUEST).json(createError("bad_request", "Invalid body"));
        return
    }

    const { error } = createOrdermealSchema.validate(body);
    if (error) {
        const errorMensage = error.details[0].message;
        res.status(StatusCodes.BAD_REQUEST).json(createError("bad_request", errorMensage));
        return
    }
    const { mealId, quantity, deliveryDate, price, category } = body;

    try {
        const newOrdermeal = await ordermealService.createOrdermeal(mealId, req.userId , quantity, deliveryDate, price, category);
        res.status(StatusCodes.CREATED).json(newOrdermeal);
    }catch (error) {
        res.status(error.code || 500).json(createError(error.message, error.message));
    }
}

const updateOrdermeal = async (req, res) => {

    const ordermealId = req.params.id;
    const updateData = req.body;

    const { error } = updateOrdermealSchema.validate(updateData);
    if (error) {
        const errorMensage = error.details[0].message;
        res.status(StatusCodes.BAD_REQUEST).json(createError("bad_request", errorMensage));
        return
    }

    if (!updateData || Object.keys(updateData).length === 0) {
        res.status(StatusCodes.BAD_REQUEST).json(createError("bad_request", "Invalid body"));
        return;
    }
    try{
        const updatedOrdermeal = await ordermealService.updateOrdermeal(ordermealId, req.userId, updateData);
        res.status(StatusCodes.OK).json(updatedOrdermeal);
    }catch (error) {
        res.status(error.code || 500).json(createError(error.message, error.message));
    }
}

module.exports = { 
    getOrdermeals, 
    getOrdermealById,
    deleteOrdermeal,
    createOrdermeal,
    updateOrdermeal 
};