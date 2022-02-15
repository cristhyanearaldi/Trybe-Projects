const loginService = require('../services/loginService');
const { HTTP_OK } = require('../utils/statusCodes');

const create = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const newLogin = await loginService.create({ email, password });
    
    return res.status(HTTP_OK).json(newLogin);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
};