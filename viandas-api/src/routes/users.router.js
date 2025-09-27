const express = require("express");


const router = express.Router();
const { getAllUsers, createUser } = require("../controllers/user.controller");

//Endpoint para obtener todas los usuarios

router.get("/users", getAllUsers);
router.post("/users", createUser);

//para editar
//router.put("/users/:id", updateUser);


//ACA SE PONEN LAS RUTAS PRIVADAS

module.exports =  router ;  


//define las rutas y llama a las operaciones del controlador