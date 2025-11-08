const { StatusCodes } = require('http-status-codes');
const buildOrdermealDTOResponse = require('../dtos/ordermeal.response.js');
const Ordermeal = require('../models/ordermeal.model');
const { model } = require('mongoose');
const { findMealById } = require('./meal.service');
const { findUserById } = require('./user.service');
const User = require('../models/user.model');


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
        let ordermealsResponse = userOrdermealsDB.map(om => {  //Es como hacer un for y pushear
            return buildOrdermealDTOResponse(om);
        });
        return ordermealsResponse;
    } catch (e) {
        let error = new Error("Error getting data from the database");
        error.status = "internal_servicer_error",
            error.code = StatusCodes.INTERNAL_SERVER_ERROR;
        throw error;
    }
}

const deleteOrdermeal = async (ordermealId, userId) => {
    try {
        const ordermeal = await findOrdermealByIdInDB(ordermealId, userId);
        await ordermeal.deleteOne();

        const user = await User.findById(userId);
        if (user && user.orderCount > 0) {
            user.orderCount = user.orderCount - 1;
            await user.save();
        }
    } catch (error) {
        throw error;
    }
}

const createOrdermeal = async (mealId, userId, quantity, deliveryDate) => {
    const user = await findUserById(userId);
    if (!validateDeliveryDate(deliveryDate)) {
        let error = new Error("The delivery date must be between tomorrow and the next 7 days.");
        error.status = "bad_request",
            error.code = StatusCodes.BAD_REQUEST;
        throw error;
    }

    if (user.plan === 'plus' || user.plan === 'Plus') {
        console.log("Entrooooooooooooo");
        const ordersInLastMonth = await countOrdersByUserIdInLastMonth(userId);
        console.log("Orders in last month:", ordersInLastMonth);
        if (ordersInLastMonth >= 10) {
            let error = new Error("You have exceeded the order limit for your plan (10 per month)");
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
        const user = await User.findById(userId);

        // Si existe, sumarle 1 al contador
        if (user) {
            user.orderCount = user.orderCount + 1; // o user.orderCount += 1;
            await user.save(); // guardar los cambios
        }


        return buildOrdermealDTOResponse(savedOrdermeal);
    } catch (e) {
        let error = new Error("Error saving data to the database");
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
                let error = new Error("The delivery date must be between tomorrow and the next 7 days.");
                error.status = "bad_request",
                    error.code = StatusCodes.BAD_REQUEST;
                throw error;
            }
            changesToApply.deliveryDate = updateData.deliveryDate;
        }

        /* if (updateData.quantity !== undefined) {
             const quantity = updateData.quantity;

             if (updateData.quantity <= 0) {
                 let error = new Error("The amount must be greater than 0");
                 error.status = "bad_request",
                     error.code = StatusCodes.BAD_REQUEST;
                 throw error;
             }
             changesToApply.quantity = quantity;
             needsRecCalcPrince = true;
         }*/


        if (updateData.quantity !== undefined) {
            const newQuantity = updateData.quantity;   // cambio nombre para claridad

            if (newQuantity <= 0) {
                let error = new Error("The amount must be greater than 0");
                error.status = "bad_request",
                    error.code = StatusCodes.BAD_REQUEST;
                throw error;
            }

            
            const oldQuantity = ordermeal.quantity;
            const difference = newQuantity - oldQuantity;

            changesToApply.quantity = newQuantity;
            needsRecCalcPrince = true;

            
            if (difference !== 0) {
                const user = await User.findById(userId);
                if (user) {
                    user.orderCount = Math.max(0, user.orderCount + difference);
                    await user.save();
                }
            }
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
        let error = new Error("Error getting data from the database");
        error.status = "internal_servicer_error",
            error.code = StatusCodes.INTERNAL_SERVER_ERROR;
        throw error;
    }

    if (!ordermeal) {
        let error = new Error("The order is not found");
        error.status = "not_found",
            error.code = StatusCodes.NOT_FOUND;
        throw error;
    }

    if (ordermeal.userId.toString() !== userId) {
        let error = new Error("You do not have permission to view this food.");
        error.status = "forbidden",
            error.code = StatusCodes.FORBIDDEN;
        throw error;
    }
    return ordermeal;
}

const countOrdersByUserIdInLastMonth = async (userId) => {

    const query = {
        userId: userId
    };

    const orderCount = await Ordermeal.countDocuments(query);
    console.log("Order count in last month in METHOD:", orderCount);
    return orderCount;
}

const validateDeliveryDate = (deliveryDate) => {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const yesterday = new Date();
    yesterday.setUTCDate(yesterday.getUTCDate());

    const targetDate = new Date(deliveryDate);
    targetDate.setUTCHours(0, 0, 0, 0);

    const sevenDaysFromNow = new Date(today);
    sevenDaysFromNow.setHours(0, 0, 0, 0);
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 8);

    if (targetDate < yesterday) {
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