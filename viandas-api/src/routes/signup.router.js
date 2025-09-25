const express = require('express');
const signup = require('../controllers/signup.controller'); 
///La ruta de login.controller.js
const { sign } = require('crypto');

const router = express.Router();

router.post("/signup", signup)

module.exports = router;