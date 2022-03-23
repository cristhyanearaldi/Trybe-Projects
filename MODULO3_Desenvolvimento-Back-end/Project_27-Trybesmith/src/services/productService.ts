import { IProduct, IInputProduct, IProductsList } from '../interfaces/Product';
import productModel from '../models/productModel';

const create = async (product: IInputProduct): Promise<IProduct> => {
  const newProduct = await productModel.create(product);

  return newProduct;
};

const getAll = async (): Promise<IProductsList[]> => {
  const products = await productModel.getAll();
  
  return products;
};

export default {
  create,
  getAll,
};