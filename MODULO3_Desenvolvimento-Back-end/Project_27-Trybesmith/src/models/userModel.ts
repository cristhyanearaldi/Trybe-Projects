import { ResultSetHeader } from 'mysql2';
import connection from './connection';
import { IInputUser, IUser } from '../interfaces/User';

const create = async (user: IInputUser): Promise<IUser> => {
  const { username, classe, level, password } = user;
  const query = 'INSERT INTO Trybesmith.Users (username, classe, level, password)' 
    + 'VALUES (?, ?, ?, ?)';

  const [result] = await connection.execute<ResultSetHeader>(
    query,
    [username, classe, level, password],
  );

  const id = result.insertId;
  const newUser: IUser = { id, username, classe, level, password };
  return newUser;
};

export default {
  create,
};