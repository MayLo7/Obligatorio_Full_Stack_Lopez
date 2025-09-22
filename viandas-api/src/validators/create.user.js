const Joi = require('joi');

// Esquema de validación para la creación de un usuario
const createUserSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(15).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    email: Joi.string().email().required(),
    plan: Joi.string().valid('plus', 'premium').required(),
}); 

module.exports = { createUserSchema };