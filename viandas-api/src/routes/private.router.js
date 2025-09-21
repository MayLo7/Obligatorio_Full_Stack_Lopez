const express = require("express");


const router = express.Router();
const { getAllUsers } = require("../controllers/user.controller");

//Endpoint para obtener todas los usuarios

router.get("/users", getAllUsers);


//ACA SE PONEN LAS RUTAS PRIVADAS

module.exports =  router ;  


//define las rutas y llama a las operaciones del controlador