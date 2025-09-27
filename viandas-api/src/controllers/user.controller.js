const {createError} = require('../utils/errors');
const { StatusCodes } = require("http-status-codes");
const createUserSchema = require('../validators/create.user');
//const { use } = require('react');

const getAllUsers = (req, res) => {
  res.status(StatusCodes.OK).json(users);
    
}

const createUser = async (req, res) => {

    const{ body } = req;
    if(!body) {
        res.status(StatusCodes.BAD_REQUEST).json(createError("bad_request", "Request body is missing"));
        return;
    }

    const { error } = createUserSchema.validate(body);
    if (error) {
        const errorMessage = error.details[0].message;
        res.status(StatusCodes.BAD_REQUEST).json(createError("bad_request", errorMessage));
        return;
    }

    try {
        const newUser = await userService.registerUser(body);
        res.status(StatusCodes.CREATED).json(newUser);
    }catch (error) {
        res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).json(createError(error.status || "internal_server_error", error.message || "Internal server error"));
    }
}

module.exports = { getAllUsers, createUser };


// EN VEZ DE HACER IF POR IF IMPORTO LAS VALIDACIONES DE JOI
// Y LAS USO ACA PARA VALIDAR EL CUERPO DE LA PETICION
// SI NO PASA LA VALIDACION, LANZO UN ERROR Y NO SIGUE
// SI PASA, SIGUE A LA SIGUIENTE FUNCION (QUE SERA LA LOGICA DE CREAR USUARIO)