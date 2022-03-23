import { IUser } from '../interfaces/User';
import userModel from '../models/userModel';
import { createAuth } from '../middlewares/authMiddleware';
import IPayload from '../interfaces/Token';

const create = async (user: IUser): Promise<string> => {
  const newUser = await userModel.create(user);
  const { id, username }: IPayload = newUser;

  const token = createAuth({ id, username });
  return token;
};

export default {
  create,
};