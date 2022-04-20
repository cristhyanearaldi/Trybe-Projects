import { createAuth } from '../middlewares/authMiddleware';
import User from '../database/models/users';
import ILogin from '../interfaces/Login';

const login = async ({ email }: ILogin) => {
  const loggedUser = await User.findOne({ where: { email } });

  if (!loggedUser) {
    return { message: 'Incorrect email or password' };
  }

  const token = createAuth({ username: loggedUser.username, role: loggedUser.role, email });

  return {
    user: {
      id: loggedUser.id,
      username: loggedUser.username,
      role: loggedUser.role,
      email,
    },
    token,
  };
};

export default {
  login,
};
