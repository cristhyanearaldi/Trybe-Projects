const express = require('express');
const loginController = require('../controllers/loginController');
const { validateLogin, validateUser } = require('../middlewares/loginValidation');

const router = express.Router({ mergeParams: true });

router.post('/', validateLogin, validateUser, loginController.create);

module.exports = router;