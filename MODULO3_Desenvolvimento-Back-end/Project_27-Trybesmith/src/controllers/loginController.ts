import { Request, Response, NextFunction } from 'express';
import StatusCode from '../enums/StatusCode';
import { IInputUser } from '../interfaces/User';
import loginService from '../services/loginService';

const login = async (req: Request, res: Response, next: NextFunction) => {
  const user: IInputUser = req.body;

  try {
    const token = await loginService.login(user);   

    if (!token) {
      return res.status(StatusCode.HTTP_UNAUTHORIZED)
        .json({ error: 'Username or password invalid' });
    }
    
    return res.status(StatusCode.HTTP_OK).json({ token });
  } catch (error) {
    next(error);
  }
};

export default {
  login,
};