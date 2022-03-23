import { Request, Response, NextFunction } from 'express';
import { IUser } from '../interfaces/User';
import userService from '../services/userService';
import StatusCode from '../enums/StatusCode';

const create = async (req: Request, res: Response, next: NextFunction) => {
  const user: IUser = req.body;

  try {
    const token = await userService.create(user);
    return res.status(StatusCode.HTTP_CREATED).json({ token });
  } catch (error) {
    next(error);
  }
};

export default {
  create,
};