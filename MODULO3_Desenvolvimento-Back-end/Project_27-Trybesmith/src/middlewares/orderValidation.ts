import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import StatusCode from '../enums/StatusCode';
import { IInputOrder } from '../interfaces/Order';

const orderSchema = Joi.object({
  products: Joi.array().items(Joi.number()).required().min(1)
    .messages({
      'array.base': 'Products must be an array of numbers',
      'any.required': 'Products is required',
      'array.min': 'Products can\'t be empty',
    }),
});

const validateOrder = async (req: Request, res: Response, next: NextFunction) => {
  const { products }: IInputOrder = req.body;
  const { error } = orderSchema.validate({ products });
  
  let errorStatus = StatusCode.HTTP_UNPROCESSABLE_ENTITY;
  if (error && (error.message.includes('is required'))) {
    errorStatus = StatusCode.HTTP_BAD_REQUEST;
  }
  if (error) {
    return res.status(errorStatus).json({ error: error.details[0].message });
  }

  return next();
};

export default validateOrder;