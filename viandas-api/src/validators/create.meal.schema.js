const Joi = require('joi');

const createMealSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
  price: Joi.number().integer().min(2).required(),
   category: Joi.string().valid('Postre', 'Plato principal').required(),
});

module.exports = createMealSchema;