const express = require("express");
const {createError} = require('../utils/errors');
const { StatusCodes } = require("http-status-codes");
const router = express.Router();

//Endpoint para el ping

router.get("/ping", (req, res) => {
  
  res.status(StatusCodes.OK).send("pong");
})

// Rutas públicas

module.exports =  router ;  