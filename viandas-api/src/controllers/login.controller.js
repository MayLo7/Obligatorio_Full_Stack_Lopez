const { StatusCodes } = require("http-status-codes");
const { createError } = require('../utils/errors');
const loginSchema = require('../validators/login.schema');
const jwt = require('jsonwebtoken');


const userService = require('../services/user.service');


const login = async(req, res) => {


    const { body } = req;   //verificamos lo que viene en el body que es donde cae la request , nos aseguramos que haya un body.

    if (!body) {
        res.status(StatusCodes.BAD_REQUEST).json(createError("BAD_REQUEST", "INVALID body"));
        return;
    }

    const { error } = loginSchema.validate(body);

    if (error) {
        res.status(StatusCodes.BAD_REQUEST).json(createError("BAD_REQUEST", error.details[0].message));
        return;
    }

    const token = await userService.doLogin(body);  //ESTAMOS YENDO AL SERVICIO DONDE ESTÁ LA LÓGICA DE NEGOCIO

    if (!token) {
        res.status(StatusCodes.UNAUTHORIZED).json(createError("UNAUTHORIZED", "Invalid credentials"));
        return;
    }

   

    res.status(StatusCodes.OK).json(token );
}

module.exports = login;// EN VEZ DE HACER IF POR IF IMPORTO LAS VALIDACIONES DE JOI