const { StatusCodes } = require('http-status-codes');
const buildOrdermealDTOResponse = require('../dtos/ordermeal.response.js');
const Ordermeal = require('../models/ordermeal.model');
const { model } = require('mongoose');
const { findMealById } = require('./meal.service');
const { findUserById } = require('./user.service');

const findOrdermealById = async (ordermealId, userId) => {
    try {
        const ordermeal = await findOrdermealByIdInDB(ordermealId, userId);
        const meal = await findMealById(ordermeal.mealId);
        return buildOrdermealDTOResponse(ordermeal, meal);
    } catch (error) {
        throw error;
    }
}

const getOrdermealsByUserId = async (userId, queryParams) => {
    try {

        let query = { userId: userId };

        if (queryParams.category) {
            query.category = queryParams.category;
        }

        if (queryParams.from || queryParams.to) {
            query.deliveryDate = {};
            if (queryParams.from) { query.deliveryDate.$gte = new Date(queryParams.from); }
            if (queryParams.to) { query.deliveryDate.$lte = new Date(queryParams.to); }
        }

        const userOrdermealsDB = await Ordermeal.find(query);
        let ordermealsResponse = userOrdermealsDB.map(om => {
            return buildOrdermealDTOResponse(om);
        });
        return ordermealsResponse;
    } catch (e) {
        let error = new Error("Error obteniendo datos de la base");
        error.status = "internal_servicer_error",
            error.code = StatusCodes.INTERNAL_SERVER_ERROR;
        throw error;
    }
}

const deleteOrdermeal = async (ordermealId, userId) => {
    try {
        const ordermeal = await findOrdermealByIdInDB(ordermealId, userId);
        await ordermeal.deleteOne();
    } catch (error) {
        throw error;
    }
}

const createOrdermeal = async (mealId, userId, quantity, deliveryDate) => {
    const user = await findUserById(userId);
    if (user.plan === 'plus' || user.plan === 'Plus') {
        const ordersInLastMonth = await countOrdersByUserIdInLastMonth(userId);
        if (ordersInLastMonth >= 10) {
            let error = new Error("Ha superado el límite de viandas para su plan (10 por mes)");
            error.status = "forbidden",
                error.code = StatusCodes.FORBIDDEN;
            throw error;
        }
    }

    const meal = await findMealById(mealId);
    const priceCalc = meal.price * quantity;

    const newOrdermeal = new Ordermeal({
        mealId: mealId,
        userId: userId,
        quantity: quantity,
        deliveryDate: deliveryDate,
        price: priceCalc,
        category: meal.category,
        mealName: meal.name
    });

    try {
        const savedOrdermeal = await newOrdermeal.save();
        return buildOrdermealDTOResponse(savedOrdermeal);
    } catch (e) {
        let error = new Error("Error guardando datos en la base");
        error.status = "internal_servicer_error",
            error.code = StatusCodes.INTERNAL_SERVER_ERROR;
        throw error;
    }
}

const updateOrdermeal = async (ordermealId, userId, updateData) => {

    try {
        const ordermeal = await findOrdermealByIdInDB(ordermealId, userId);
        let changesToApply = {};
        let needsRecCalcPrince = false;

        if (updateData.deliveryDate) {
            if (!validateDeliveryDate(updateData.deliveryDate)) {
                let error = new Error("La fecha de entrega debe ser entre mañana y los próximos 7 días");
                error.status = "bad_request",
                    error.code = StatusCodes.BAD_REQUEST;
                throw error;
            }
            changesToApply.deliveryDate = updateData.deliveryDate;
        }

        if (updateData.quantity !== undefined) {
            const quantity = updateData.quantity;

            if (updateData.quantity <= 0) {
                let error = new Error("La cantidad debe ser mayor a 0");
                error.status = "bad_request",
                    error.code = StatusCodes.BAD_REQUEST;
                throw error;
            }
            changesToApply.quantity = quantity;
            needsRecCalcPrince = true;
        }

        if (needsRecCalcPrince) {
            const meal = await findMealById(ordermeal.mealId);
            changesToApply.price = meal.price * changesToApply.quantity;
        }

        Object.assign(ordermeal, changesToApply);
        const updatedOrdermeal = await ordermeal.save();
        return buildOrdermealDTOResponse(updatedOrdermeal);
    } catch (error) {
        throw error;
    }
}

const findOrdermealByIdInDB = async (ordermealId, userId) => {
    let ordermeal;

    try {
        ordermeal = await Ordermeal.findById(ordermealId);
    } catch (e) {
        let error = new Error("Error obteniendo datos de la base");
        error.status = "internal_servicer_error",
            error.code = StatusCodes.INTERNAL_SERVER_ERROR;
        throw error;
    }

    if (!ordermeal) {
        let error = new Error("No se encontra la vianda");
        error.status = "not_found",
            error.code = StatusCodes.NOT_FOUND;
        throw error;
    }

    if (ordermeal.userId.toString() !== userId) {
        let error = new Error("No tiene permisos para ver esta vianda");
        error.status = "forbidden",
            error.code = StatusCodes.FORBIDDEN;
        throw error;
    }
    return ordermeal;
}

const countOrdersByUserIdInLastMonth = async (userId) => {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const query = {
        userId: userId,
        deliveryDate: { $gte: firstDayOfMonth, $lte: today }
    };

    const orderCount = (await Ordermeal.find(query)).length;
    //existe la alternativa de countDocuments de mongoose
    return orderCount;
}

const validateDeliveryDate = (deliveryDate) => {
    const today = new Date();
    const targetDate = new Date(deliveryDate);

    today.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);

    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setHours(0, 0, 0, 0);
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

    if (targetDate <= today) {
        return false;
    }
    if (targetDate > sevenDaysFromNow) {
        return false;
    }

    return true;
}

module.exports = {
    findOrdermealById,
    getOrdermealsByUserId,
    deleteOrdermeal,
    createOrdermeal,
    updateOrdermeal
}