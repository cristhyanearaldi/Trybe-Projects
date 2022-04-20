import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';
import { compareSync } from 'bcryptjs';
import ILogin from '../interfaces/Login';
import StatusCode from '../enums/StatusCode';
import User from '../database/models/users';

const userLoginSchema = Joi.object({
  email: Joi.string().required().min(1),
  password: Joi.string().required().min(6),
});

const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password }: ILogin = req.body;
  const { error } = userLoginSchema.validate({ email, password });

  if (error) {
    return res.status(StatusCode.HTTP_UNAUTHORIZED).json({ message: 'All fields must be filled' });
  }

  return next();
};

const validateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password }: ILogin = req.body;

  const existingEmail = await User.findOne({ where: { email } });

  if (!existingEmail) {
    return res
      .status(StatusCode.HTTP_UNAUTHORIZED)
      .json({ message: 'Incorrect email or password' });
  }

  const passwordInDB = compareSync(password, existingEmail.password);
  if (!passwordInDB) {
    return res
      .status(StatusCode.HTTP_UNAUTHORIZED)
      .json({ message: 'Incorrect email or password' });
  }
  return next();
};

export {
  validateLogin,
  validateUser,
};
