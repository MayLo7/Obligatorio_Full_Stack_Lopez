const express = require('express');
const router = express.Router();
const { getMeals } = require('../controllers/meal.controller');

router.get('/meals', getMeals);

module.exports = router;