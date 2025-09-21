const express = require("express");
const {createError} = require('../utils/errors');
const { StatusCodes } = require("http-status-codes");
const router = express.Router();

//Endpoint para obtener todas los usuarios

router.get("/users", (req, res) => {
  res.status(StatusCodes.OK).json(users);
    
});


//ACA SE PONEN LAS RUTAS PRIVADAS

module.exports =  router ;  