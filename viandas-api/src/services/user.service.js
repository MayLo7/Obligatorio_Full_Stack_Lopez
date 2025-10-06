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
        plan: plan,//Este tiene que ser por defecto "Plus"
        orderCount: orderCount
    });

    try {
        const savedUser = await newUser.save();
        const userDTO = buildUserDTOResponse(savedUser);
        return userDTO;
    } catch (error) {
        console.error("Error al guardar usuario:", error);
        let e = new Error("Error saving user in database");
        e.status = "internal_server_error ";
        e.code = StatusCodes.INTERNAL_SERVER_ERROR;
        console.log(error);
        throw e;
    }
}

const getUserByUserName = async username => await User.findOne({ username: username });

const findUserById = async userId => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            let error = new Error("User not found");
            error.status = "not_found";
            error.code = StatusCodes.NOT_FOUND;
            throw error;
        }
        return buildUserDTOResponse(user);
    } catch (e) {
        let error = new Error("Error getting user from database");
        error.status = "internal_server_error";
        error.code = StatusCodes.INTERNAL_SERVER_ERROR;
        throw error;
    }
}



const updateUserPlan = async (userId, newPlan) => {
  const user = await User.findById(userId);
  if (!user) {
    const e = new Error('User not found');
    e.status = 'not_found';
    e.code = StatusCodes.NOT_FOUND;
    throw e;
  }

  if (user.plan !== 'plus') {
    const e = new Error('Only Plus users can change their plan');
    e.status = 'forbidden';
    e.code = StatusCodes.FORBIDDEN;
    throw e;
  }

  if (newPlan !== 'premium') {
    const e = new Error('The new plan must be premium.');
    e.status = 'bad_request';
    e.code = StatusCodes.BAD_REQUEST;
    throw e;
  }

  user.plan = String(newPlan).trim().toLowerCase();
  const saved = await user.save();
  return buildUserDTOResponse(saved);
};

module.exports = {
  doLogin,
  registerUser,
  findUserById,
  updateUserPlan,          
};
