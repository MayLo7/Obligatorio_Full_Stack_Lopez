const Joi = require('joi');

// Esquema de validación para la creación de un usuario
const updateUserPlanSchema = Joi.object({
  
    plan: Joi.string().valid('plus','Plus','Premium', 'premium').required()    
}); 

module.exports =  updateUserPlanSchema ;