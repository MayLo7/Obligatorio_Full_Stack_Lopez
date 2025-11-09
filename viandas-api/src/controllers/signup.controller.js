const { createError } = require('../utils/errors');
const { StatusCodes } = require('http-status-codes');
const userService = require('../services/user.service');
const { createUserSchema } = require('../validators/create.user');


const signup = async (req, res) => {
    const { body } = req;


    console.log('[signup] body:', body);

    if (!body) {
        res.status(StatusCodes.BAD_REQUEST).json(createError("BAD_REQUEST", "INVALID body"));
        return;
    }

    const { value, error } = createUserSchema.validate(body, {
        abortEarly: false,
        stripUnknown: true
    });

    if (error) {
        const errorMessage = error.details[0].message;
        res.status(StatusCodes.BAD_REQUEST).json(createError("bad_request", errorMessage));
        return;
    }


    try {
        const newUser = await userService.registerUser(value);
        res.status(StatusCodes.CREATED).json(newUser);

    } catch (error) {
        console.error('[signup error]', error.message);
        console.error('[signup stack]', error.stack);

        console.error('[signup] error:', error);
        res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).json(createError(error.status, error.message));
    }
}

module.exports = signup;


//En app.js importarlo y usarlo como middleware antes de las rutas privadas
// hacer el const signupRouter = require('./signup/signup.router'); y const loginRouter = require('./login/login.router');
// luego app.use("/public",signupRouter); y app.use("/public",loginRouter);