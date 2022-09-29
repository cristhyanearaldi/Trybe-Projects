import { Request, Response } from 'express';
import MessageErrors from '../enums/MessageErrors';
import MongoService from '../services';

export type ResponseError = {
  error: unknown;
};

export interface RequestWithBody<T> extends Request {
  body: T;
}

abstract class MongoController<T> {
  abstract route: string;

  protected errors = MessageErrors;

  constructor(protected service: MongoService<T>) {}

  public abstract create(
    req: RequestWithBody<T>, res: Response<T | ResponseError>
  ): Promise<typeof res>;

  public abstract read(
    _req: Request, res: Response<T[] | ResponseError>
  ): Promise<typeof res>;

  public abstract readOne(
    req: Request<{ id: string }>, res: Response<T | ResponseError>
  ): Promise<typeof res>;

  public abstract update(
    req: Request<{ id: string }>, res: Response<T | ResponseError>
  ): Promise<typeof res>;

  public abstract delete(
    req: Request<{ id: string }>, res: Response<T | ResponseError>
  ): Promise<typeof res>;
}

export default MongoController;
