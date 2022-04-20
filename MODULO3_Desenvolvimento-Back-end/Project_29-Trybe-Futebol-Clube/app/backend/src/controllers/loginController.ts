import { Request, Response, NextFunction } from 'express';
import ILogin from '../interfaces/Login';
import StatusCode from '../enums/StatusCode';
import loginService from '../service/loginService';

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password }: ILogin = req.body;

  try {
    const newLogin = await loginService.login({ email, password });

    return res.status(StatusCode.HTTP_OK).json(newLogin);
  } catch (error) {
    next(error);
  }
};

export default {
  login,
};
