const { StatusCodes } = require('http-status-codes');
const { createError } = require('../utils/errors');
const jwt = require('jsonwebtoken');



const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {

        res.status(StatusCodes.UNAUTHORIZED).json(createError("unathorized", "Auth token was not provided"));
        console.log("No hay token");
        return;
    }
}

// Lógica de autenticación (ejemplo simple)
module.exports = { authMiddleware };