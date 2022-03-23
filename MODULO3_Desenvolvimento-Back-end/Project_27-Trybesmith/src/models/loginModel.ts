import connection from './connection';
import { IUser } from '../interfaces/User';
import ILogin from '../interfaces/Login';

const login = async (user: ILogin): Promise<IUser> => {
  const { username, password } = user;
  const query = 'SELECT * FROM Trybesmith.Users WHERE username = ? AND password = ?';
  const [data] = await connection.execute(
    query,
    [username, password],
  );

  const [row] = data as IUser[];
  return row;
};

export default {
  login,
};