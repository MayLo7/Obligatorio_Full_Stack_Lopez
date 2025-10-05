const { StatusCodes } = require('http-status-codes');
const { createError } = require('../utils/errors');
const jwt = require('jsonwebtoken');



const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

     console.log('[AUTH] header =', token);

    if (!token) {

        res.status(StatusCodes.UNAUTHORIZED).json(createError("unathorized", "Auth token was not provided"));
        console.log("No hay token");
        return;
    }
    


    try {
        const verifiedJWT = jwt.verify(token, process.env.JWT_AUTH_SECRET_KEY);

        req.userId = verifiedJWT.userId || verifiedJWT._id || verifiedJWT.id;
       // req.user = verifiedJWT.userId;
        console.log("devolucion token:", verifiedJWT);
        next();
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json(createError("unauthorized", "Auth token is invalid"));
        console.log("Token invalido");
        return;
    }
}

// Lógica de autenticación (ejemplo simple)
module.exports = { authMiddleware };