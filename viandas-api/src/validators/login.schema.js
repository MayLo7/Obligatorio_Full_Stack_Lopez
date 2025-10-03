
const Joi = require('joi');

const loginSchema = Joi.object({
    username: Joi.string().alphanum().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),

});

module.exports = loginSchema;