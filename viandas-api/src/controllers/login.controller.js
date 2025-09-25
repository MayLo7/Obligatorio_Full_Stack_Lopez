const express = require('express');
const { StatusCodes } = require("http-status-codes");
const { createError } = require('../utils/errors');
const jwt = require('jsonwebtoken');

const createUserNameSchema = require('../validators/create.user.schema');
const loginSchema = require('../validators/login.schema');
const { doLogin } = require('../services/login.service');
const login = async(req, res) => {


    const { body } = req;

    if (!body) {
        res.status(StatusCodes.BAD_REQUEST).json(createError("BAD_REQUEST", "INVALID body"));
        return;
    }

    const { error } = loginSchema.validate(body);

    if (error) {
        res.status(StatusCodes.BAD_REQUEST).json(createError("BAD_REQUEST", error.details[0].message));
        return;
    }

    const user = await doLogin(body);
    if (!user) {
        res.status(StatusCodes.UNAUTHORIZED).json(createError("UNAUTHORIZED", "Invalid credentials"));
        return;
    }

    const token = jwt.sign(user, process.env.JWT_AUTH_SECRET_KEY, { expiresIn: '1h' });
    user.token = token;


    res.status(StatusCodes.OK).json({token : token});
}

module.exports = login;// EN VEZ DE HACER IF POR IF IMPORTO LAS VALIDACIONES DE JOI