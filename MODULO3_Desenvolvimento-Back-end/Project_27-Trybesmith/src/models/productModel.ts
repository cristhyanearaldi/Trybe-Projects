import { ResultSetHeader } from 'mysql2';
import { IProduct, IInputProduct, IProductsList } from '../interfaces/Product';
import connection from './connection';

const create = async (product: IInputProduct): Promise<IProduct> => {
  const { name, amount } = product;
  const query = 'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)';

  const [result] = await connection.execute<ResultSetHeader>(
    query,
    [name, amount],
  );

  const id = result.insertId;
  const newProduct: IProduct = { item: { id, name, amount } };
  return newProduct;
};

const getAll = async (): Promise<IProductsList[]> => {
  const query = 'SELECT * FROM Trybesmith.Products';

  const [rows] = await connection.execute(query);
  return rows as IProductsList[];
};

export default {
  create,
  getAll,
};