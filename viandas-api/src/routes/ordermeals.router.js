const express = require('express');

const {
    createOrdermeal,
    getOrdermeals,
    getOrdermealById,
    updateOrdermeal,
    deleteOrdermeal
} = require('../controllers/ordermeals.controller');

const router = express.Router();

// Endpoint para obtener las vianda
router.get('/ordermeals', getOrdermeals);

// Endpoint para obtener una vianda por ID
router.get('/ordermeals/:id', getOrdermealById);

// Endpoint para crear una nueva vianda
router.post('/ordermeals', createOrdermeal);

// Endpoint para actualizar una vianda por ID
router.put('/ordermeals/:id', updateOrdermeal);

// Endpoint para eliminar una vianda por ID
router.delete('/ordermeals/:id', deleteOrdermeal);

module.exports = router;

