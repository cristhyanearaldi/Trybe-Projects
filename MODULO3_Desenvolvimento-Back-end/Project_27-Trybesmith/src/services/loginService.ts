import ILogin from '../interfaces/Login';
import { createAuth } from '../middlewares/authMiddleware';
import loginModel from '../models/loginModel';

const login = async (user: ILogin): Promise<string> => {
  const { username, password } = user;
  const loggedUser = await loginModel.login({ username, password });
  
  if (!loggedUser) {
    return '';
  }
  const token = createAuth({ id: loggedUser.id, username: user.username });
  return token;
};

export default {
  login,
};