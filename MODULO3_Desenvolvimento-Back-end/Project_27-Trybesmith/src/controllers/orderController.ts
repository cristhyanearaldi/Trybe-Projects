import { Request, Response, NextFunction } from 'express';
import StatusCode from '../enums/StatusCode';
import { IInputOrder } from '../interfaces/Order';
import orderService from '../services/orderService';

const create = async (req: Request, res: Response, next: NextFunction) => {
  const order: IInputOrder = req.body;

  try {
    const newOrder = await orderService.create(order);
    return res.status(StatusCode.HTTP_CREATED).json(newOrder);
  } catch (error) {
    next(error);
  }
};

export default {
  create,
};