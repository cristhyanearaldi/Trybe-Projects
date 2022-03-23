export interface IInputUser {
  username: string;
  classe: string;
  level: number;
  password: string;
}

export interface IUser extends IInputUser {
  id: number;
}
