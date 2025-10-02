const Joi = require('joi');

const updateOrdermealSchema = Joi.object({
    deliveryDate: Joi.date().iso().optional(),
    quantity: Joi.number().integer().min(1).optional()
})

module.exports = updateOrdermealSchema;