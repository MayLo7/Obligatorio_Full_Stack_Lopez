const express = require('express');
const { updateUserPlan } = require('../controllers/users.controller');

const router = express.Router();

// PUT /v1/users/:id/plan  (ruta privada)
router.put('/users/:id', updateUserPlan);

module.exports = router;