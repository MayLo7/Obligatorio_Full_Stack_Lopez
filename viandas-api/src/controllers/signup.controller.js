const express = require('express');
const { createError } = require('../utils/errors');
const StatusCodes= require('http-status-codes');
const { createUser, getUserByUsername } = require('../models/bd');


const createUserSchema = require('../validators/create.user.schema');


const signup = async (req,res)=>{
    const { body } = req;
    
    if (!body) {
        res.status(StatusCodes.BAD_REQUEST).json(createError("BAD_REQUEST", "INVALID body"));
        return;
    }

   

    const { error } = createUserSchema.validate(body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    res.status(StatusCodes.OK).send("signup ok");

    const userExists =  getUserByUsername(body.username);
    if (userExists) {
        res.status(StatusCodes.CONFLICT).json(createError("CONFLICT", `Username ${body.username} already exists`));
        return;
    }

    const newUser = await createUser(body);
    res.status(StatusCodes.CREATED).json(newUser);


}

module.exports= signup;


//En app.js importarlo y usarlo como middleware antes de las rutas privadas
// hacer el const signupRouter = require('./signup/signup.router'); y const loginRouter = require('./login/login.router');
// luego app.use("/public",signupRouter); y app.use("/public",loginRouter);