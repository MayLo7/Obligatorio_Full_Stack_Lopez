const express = require("express");

const { StatusCodes } = require("http-status-codes");
const { ping } = require("../controllers/health.controller");
const router = express.Router();

//Endpoint para el ping

router.get("/public/ping",ping )
router.get("/",ping )
  



module.exports =  router ;  