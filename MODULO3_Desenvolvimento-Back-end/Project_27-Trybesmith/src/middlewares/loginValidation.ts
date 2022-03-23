import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import StatusCode from '../enums/StatusCode';
import ILogin from '../interfaces/Login';

const loginSchema = Joi.object({
  username: Joi.required().messages({
    'any.required': 'Username is required',
  }),
  password: Joi.required().messages({
    'any.required': 'Password is required',
  }),
});

const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const user: ILogin = req.body;
  const { error } = loginSchema.validate(user);

  const errorStatus = StatusCode.HTTP_BAD_REQUEST;
  if (error) {
    return res.status(errorStatus).json({ error: error.details[0].message });
  }

  return next();
};

export default validateLogin;