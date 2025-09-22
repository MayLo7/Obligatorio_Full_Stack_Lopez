const { StatusCodes } = require('http-status-codes');
const buildOrdermealDTOResponse = require('../dtos/ordermeal.response.js');
const Ordermeal = require('../models/ordermeal.model');
const { model } = require('mongoose');

const findOrdermealById = async (ordermealId, userId) => {
    try {
        const ordermeal = await findOrdermealByIdInDB(ordermealId, userId);
        return buildOrdermealDTOResponse(ordermeal);
    }catch (error) {
        throw error;
    }
}

const getOrdermealsByUserId = async (userId) => {
    try {
        const userOrdermealsDB = await Ordermeal.find({ userId: userId });

        let ordermealsResponse = userOrdermealsDB.map(om => {
            return buildOrdermealDTOResponse(om);
        })

        return ordermealsResponse;
    }catch (e){
        let error = new Error("Error obteniendo datos de la base");
        error.status = "internal_servicer_error",
            error.code = StatusCodes.INTERNAL_SERVER_ERROR;
        throw error;
    }
}

const deleteOrderneal = async (ordermealId, userId) => {
    try {
        const ordermeal = await findOrdermealByIdInDB(ordermealId, userId);
        await ordermeal.deleteOne();
    }catch (error) {
        throw error;
    }
}

const createOrdermeal = async (mealId, userId, quantity, deliveryDate, price, category) => {
    const newOrdermeal = new Ordermeal({
        mealId : mealId,
        userId : userId,
        quantity : quantity,
        deliveryDate : deliveryDate,
        price : price, //Ver esto!
        category : category
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

const updateOrdermeal = async (ordermealId, userId, quantity, deliveryDate) => {
    //Tener en cuenta que si cambia el quantity deberá cambiar el price
    try {
        const ordermeal = await findOrdermealByIdInDB(ordermealId, userId);
        Object.assign(ordermeal, { quantity: quantity, deliveryDate: deliveryDate });
        const updateOrdermeal = await ordermeal.save();
        return buildOrdermealDTOResponse(updateOrdermeal);
    } catch (error) {
        throw error;
    }
}

const findOrdermealByIdInDB = async (ordermealId, userId) => {
    let ordermeal;

    try {
        ordermeal = await Ordermeal.findById(ordermealId);
    }catch (e) {
        let error = new Error("Error obteniendo datos de la base");
        error.status = "internal_servicer_error",
            error.code = StatusCodes.INTERNAL_SERVER_ERROR;
        throw error;
    }

    if(!ordermeal) {
        let error = new Error("No se encontra la vianda");
        error.status = "not_found",
            error.code = StatusCodes.NOT_FOUND;
        throw error;
    }

    if(ordermeal.userId.toString() !== userId) {
        let error = new Error("No tiene permisos para ver esta vianda");
        error.status = "forbidden",
            error.code = StatusCodes.FORBIDDEN;
        throw error;
    }
    return ordermeal;
}

module.exports = { 
    findOrdermealById, 
    getOrdermealsByUserId, 
    deleteOrderneal, 
    createOrdermeal, 
    updateOrdermeal 
}