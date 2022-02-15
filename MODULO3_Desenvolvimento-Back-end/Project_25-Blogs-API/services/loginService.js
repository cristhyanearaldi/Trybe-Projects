const { User } = require('../models');
const { createAuth } = require('../middlewares/authMiddleware');

const create = async ({ email, password }) => {
  const newLogin = await User.findOne({ where: { email } });

  if (!newLogin) {
    return { message: 'Invalid fields' };
  }

  const token = await createAuth(email, password, newLogin.id);

  return token;
};

module.exports = {
  create,
};