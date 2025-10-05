const Joi = require('joi');

const createOrdermealSchema = Joi.object({
   mealId: Joi.string().hex().length(24).required(),
   quantity: Joi.number().integer().min(1).required(),
   deliveryDate: Joi.date().iso().required(),
   //price: Joi.number().precision(2).required(),
   // category: Joi.string().valid('Postre', 'Plato principal').required(),
});

module.exports = createOrdermealSchema;