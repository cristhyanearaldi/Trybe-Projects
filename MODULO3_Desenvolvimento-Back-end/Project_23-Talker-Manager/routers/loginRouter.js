const express = require('express');
const checkEmail = require('../middlewares/checkEmail');
const checkPassword = require('../middlewares/checkPassword');
const generateToken = require('../middlewares/generateToken');

const router = express.Router();

router.post('/', checkEmail, checkPassword, generateToken);

module.exports = router;