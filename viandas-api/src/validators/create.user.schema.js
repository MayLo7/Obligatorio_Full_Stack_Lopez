const Joi  = require('joi');

const createUserSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    email: Joi.string().email().required().messages({
        'string.email': 'El correo electrónico no es válido',
        'string.empty': 'El correo electrónico no puede estar vacío',
        'any.required': 'El correo electrónico es obligatorio'
    }),
});

module.exports = createUserSchema;