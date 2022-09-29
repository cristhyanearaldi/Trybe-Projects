import { Request, Response, NextFunction } from 'express';
import { ResponseError } from '../controllers';
import MessageErrors from '../enums/MessageErrors';
import StatusCode from '../enums/StatusCode';

const idValidation = async (
  req: Request<{ id: string }>, 
  res: Response<ResponseError>,
  next: NextFunction,
) => {
  const { id } = req.params;

  if (id.length < 24) {
    return res
      .status(StatusCode.HTTP_BAD_REQUEST)
      .json({ error: MessageErrors.invalidId });
  }
  
  next();
};

export default idValidation;
