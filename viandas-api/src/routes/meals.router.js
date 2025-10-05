const express = require('express');
const router = express.Router();
const { getMeals, createMeal } = require('../controllers/meal.controller');




router.get('/meals', getMeals); // Endpoint para obtener todas las meals

router.post('/meals', createMeal);  // Endpoint para crear una nueva meal

module.exports = router;