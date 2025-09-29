const express = require('express');

const {
    createOrderMeal,
    getOrderMeals,
    getOrderMealById,
    updateOrderMeal,
    deleteOrderMeal
} = require('../controllers/ordermeals.controller');

const router = express.Router();

// Endpoint para obtener las vianda
router.get('/ordermeals', getOrderMeals);

// Endpoint para obtener una vianda por ID
router.get('/ordermeals/:id', getOrderMealById);

// Endpoint para crear una nueva vianda
router.post('/ordermeals', createOrderMeal);

// Endpoint para actualizar una vianda por ID
router.put('/ordermeals/:id', updateOrderMeal);

// Endpoint para eliminar una vianda por ID
router.delete('/ordermeals/:id', deleteOrderMeal);

module.exports = router;

