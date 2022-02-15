const Joi = require('joi');
const { User } = require('../models');
const { HTTP_BAD_REQUEST } = require('../utils/statusCodes');

const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validateLogin = async (req, res, next) => {
  const login = req.body;
  const { error } = userLoginSchema.validate(login);

  if (error) {
    return res.status(HTTP_BAD_REQUEST).json({ message: error.details[0].message });
  } 

  return next();
};

const validateUser = async (req, res, next) => {
  const { email } = req.body;
  const existingEmail = await User.findOne({ where: { email } });

  if (!existingEmail) {
    return res.status(HTTP_BAD_REQUEST).json({ message: 'Invalid fields' });
  }
  return next();
};

module.exports = {
  validateLogin,
  validateUser,
};