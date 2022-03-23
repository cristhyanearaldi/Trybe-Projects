import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import StatusCode from '../enums/StatusCode';
import { IInputProduct } from '../interfaces/Product';

const productSchema = Joi.object({
  name: Joi.string().required().min(3).messages({
    'string.base': 'Name must be a string',
    'any.required': 'Name is required',
    'string.min': 'Name must be longer than 2 characters',
  }),
  amount: Joi.string().required().min(3).messages({
    'string.base': 'Amount must be a string',
    'any.required': 'Amount is required',
    'string.min': 'Amount must be longer than 2 characters',
  }),
});

const validateProduct = async (req: Request, res: Response, next: NextFunction) => {
  const product: IInputProduct = req.body;
  const { error } = productSchema.validate(product);

  let errorStatus = StatusCode.HTTP_UNPROCESSABLE_ENTITY;
  if (error && (error.message.includes('is required'))) {
    errorStatus = StatusCode.HTTP_BAD_REQUEST;
  }

  if (error) {
    return res.status(errorStatus).json({ error: error.details[0].message });
  }

  return next();
};

export default validateProduct;