//En la carpeta de validators.
const Joi = require('joi');

const loginSchema = Joi.object({
    username: Joi.string().alphanum().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    //email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
});

module.exports = loginSchema;