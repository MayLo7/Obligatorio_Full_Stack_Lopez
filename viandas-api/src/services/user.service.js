const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require("http-status-codes");
const buildUserDTOResponse = require('../dtos/user.response.dto');

const doLogin = async ({ username, password }) => {

    const user = await getUserByUserName(username);

    console.log(user);

    if (!user) {
        return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return null;
    }

    const token = jwt.sign({ username: user.username, email: user.email, plan: user.plan, orderCount: user.orderCount, id: user._id.toString() }
        , process.env.JWT_AUTH_SECRET_KEY, { expiresIn: '1h' });


    return { token: token };
}

const registerUser = async ({ username, password, email, plan, orderCount }) => {
    if (await getUserByUserName(username)) {
        let error = new Error(`Username ${username} already exists`);
        error.status = "conflict";
        error.code = StatusCodes.CONFLICT;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        username: username,
        password: hashedPassword,
        email: email,
        plan: plan,
        orderCount: orderCount
    });

    try {
        const savedUser = await newUser.save();
        const userDTO = buildUserDTOResponse(savedUser);
        return userDTO;
    } catch (error) {
        console.error("Error al guardar usuario:", error);
        let e = new Error("Error saving user in database");
        e.status = "internal_server_error LA CONCHA DE TU MADRE";
        e.code = StatusCodes.INTERNAL_SERVER_ERROR;
        console.log(error);
        throw e;
    }
}

const getUserByUserName = async username => await User.findOne({ username: username });


module.exports = { doLogin, registerUser };
