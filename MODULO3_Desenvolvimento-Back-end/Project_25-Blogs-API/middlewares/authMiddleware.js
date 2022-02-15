require('dotenv').config();
const jwt = require('jsonwebtoken');
const { HTTP_UNAUTHORIZED } = require('../utils/statusCodes');

const SECRET = process.env.JWT_SECRET;

const createAuth = async (email, password, id) => {
  const user = { email, password, id };
  
  const token = jwt.sign(user, SECRET, {
    algorithm: 'HS256',
    expiresIn: '1d',
  });

  return { token };
};

const verifyAuth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(HTTP_UNAUTHORIZED).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(authorization, SECRET);
    req.user = decoded; // coloca o usuário no obj req para deixá-lo disponível

    next();
  } catch (error) {
    return res.status(HTTP_UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  createAuth,
  verifyAuth,
};