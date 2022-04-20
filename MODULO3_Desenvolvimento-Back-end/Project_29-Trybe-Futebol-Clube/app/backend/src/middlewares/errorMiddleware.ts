import { Request, Response, NextFunction } from 'express';
import StatusCode from '../enums/StatusCode';
import IError from '../interfaces/Error';

const errorMiddleware = (err: IError, _req: Request, res: Response, _next: NextFunction) => {
  console.log(err);

  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }

  res.status(StatusCode.HTTP_INTERNAL_SERVER_ERROR).json({
    error: {
      message: 'Internal Server Error',
    },
  });
};

export default errorMiddleware;
