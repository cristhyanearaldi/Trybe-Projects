import { IInputOrder, IOrder } from '../interfaces/Order';
import orderModel from '../models/orderModel';

const create = async (order: IInputOrder): Promise<IOrder> => {
  const newOrder = await orderModel.create(order);

  return newOrder;
};

export default {
  create,
};