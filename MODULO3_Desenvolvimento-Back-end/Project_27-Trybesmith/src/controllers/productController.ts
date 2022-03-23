import { Request, Response, NextFunction } from 'express';
import StatusCode from '../enums/StatusCode';
import { IInputProduct } from '../interfaces/Product';
import productService from '../services/productService';

const create = async (req: Request, res: Response, next: NextFunction) => {
  const product: IInputProduct = req.body;

  try {
    const newProduct = await productService.create(product);
    return res.status(StatusCode.HTTP_CREATED).json(newProduct);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await productService.getAll();
    return res.status(StatusCode.HTTP_OK).json(products);
  } catch (error) {
    next(error);
  }
};

export default {
  create,
  getAll,
};