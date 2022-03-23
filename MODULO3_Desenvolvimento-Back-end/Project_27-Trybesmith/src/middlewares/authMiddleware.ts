import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import StatusCode from '../enums/StatusCode';
import IPayload from '../interfaces/Token';

dotenv.config();

const SECRET = 'my_secret';

const createAuth = (userData: IPayload) => {
  const token = jwt.sign(userData, SECRET, {
    algorithm: 'HS256',
    expiresIn: '1d',
  });

  return token;
};

const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(StatusCode.HTTP_UNAUTHORIZED).json({ error: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(authorization, SECRET);
    const { id } = decoded as IPayload;
    req.body = { userId: id, ...req.body };
    
    next();
  } catch (error) {
    return res.status(StatusCode.HTTP_UNAUTHORIZED).json({ error: 'Invalid token' });
  }
};

export {
  createAuth,
  verifyAuth,
};