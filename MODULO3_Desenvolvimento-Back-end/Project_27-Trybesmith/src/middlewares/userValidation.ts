import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import StatusCode from '../enums/StatusCode';
import { IInputUser } from '../interfaces/User';

const userSchema = Joi.object({
  username: Joi.string().required().min(3).messages({
    'string.base': 'Username must be a string',
    'any.required': 'Username is required',
    'string.min': 'Username must be longer than 2 characters',
  }),
  classe: Joi.string().required().min(3).messages({
    'string.base': 'Classe must be a string',
    'any.required': 'Classe is required',
    'string.min': 'Classe must be longer than 2 characters',
  }),
  level: Joi.number().strict().required().min(1)
    .messages({
      'number.base': 'Level must be a number',
      'any.required': 'Level is required',
      'number.min': 'Level must be greater than 0',
    }),
  password: Joi.string().required().min(8).messages({
    'string.min': 'Password must be longer than 7 characters',
    'string.base': 'Password must be a string',
    'any.required': 'Password is required',
  }),
});

const validateUser = async (req: Request, res: Response, next: NextFunction) => {
  const user: IInputUser = req.body;
  const { error } = userSchema.validate(user);

  let errorStatus = StatusCode.HTTP_UNPROCESSABLE_ENTITY;

  if (error && (error.message.includes('is required'))) {
    errorStatus = StatusCode.HTTP_BAD_REQUEST;
  }

  if (error) {
    return res.status(errorStatus).json({ error: error.details[0].message });
  }

  return next();
};

export default validateUser;