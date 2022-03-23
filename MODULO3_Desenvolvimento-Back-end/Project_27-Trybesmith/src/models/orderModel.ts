import { ResultSetHeader } from 'mysql2';
import { IInputOrder, IOrder } from '../interfaces/Order';
import connection from './connection';

const create = async (order: IInputOrder): Promise<IOrder> => {
  const { userId, products } = order;
  
  const query = 'INSERT INTO Trybesmith.Orders (userId) VALUES (?)';
  
  await connection.execute<ResultSetHeader>(
    query,
    [userId],
  );

  const newOrder: IOrder = {
    order: {
      userId, products,
    },
  };

  return newOrder;
};

export default {
  create,
};