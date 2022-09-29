import { Request, Response } from 'express';
import MongoController, { RequestWithBody, ResponseError } from '.';
import StatusCode from '../enums/StatusCode';
import { Motorcycle as IMotorcycle } from '../interfaces/MotorcycleInterface';
import MotorcycleService from '../services/MotorcycleService';

class MotorcycleController extends MongoController<IMotorcycle> {
  private _route: string;

  constructor(
    public motorcycleService = new MotorcycleService(),
    route = '/motorcycles',
  ) {
    super(motorcycleService);
    this._route = route;
  }

  get route() {
    return this._route;
  }

  public create = async (
    req: RequestWithBody<IMotorcycle>, 
    res: Response<IMotorcycle | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const newMotorcycle = await this.motorcycleService.create(req.body);

      if (!newMotorcycle) {
        return res.status(StatusCode.HTTP_INTERNAL_SERVER_ERROR)
          .json({ error: this.errors.internal });
      }

      if ('error' in newMotorcycle) {
        return res.status(StatusCode.HTTP_BAD_REQUEST).json(newMotorcycle);
      }

      return res.status(StatusCode.HTTP_CREATED).json(newMotorcycle);
    } catch (error) {
      return res.status(StatusCode.HTTP_INTERNAL_SERVER_ERROR)
        .json({ error: this.errors.internal });
    }
  };

  public read = async (
    req: Request,
    res: Response<IMotorcycle[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const motorcycles = await this.motorcycleService.read();
      return res.status(StatusCode.HTTP_OK).json(motorcycles);
    } catch (error) {
      return res.status(StatusCode.HTTP_INTERNAL_SERVER_ERROR)
        .json({ error: this.errors.internal });
    }
  };

  public readOne = async (
    req: Request<{ id: string }>, 
    res: Response<IMotorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      const motorcycle = await this.motorcycleService.readOne(id);

      if (!motorcycle) {
        return res.status(StatusCode.HTTP_NOT_FOUND)
          .json({ error: this.errors.notFound });
      }
      
      return res.status(StatusCode.HTTP_OK).json(motorcycle);
    } catch (error) {
      return res.status(StatusCode.HTTP_INTERNAL_SERVER_ERROR)
        .json({ error: this.errors.internal });
    }
  };

  public update = async (
    req: Request<{ id: string }>, 
    res: Response<IMotorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;

    try {
      const updatedMotorcycle = await this
        .motorcycleService.update(id, req.body);

      if (!updatedMotorcycle) {
        return res.status(StatusCode.HTTP_NOT_FOUND)
          .json({ error: this.errors.notFound });
      }

      return res.status(StatusCode.HTTP_OK).json(updatedMotorcycle);
    } catch (error) {
      return res.status(StatusCode.HTTP_INTERNAL_SERVER_ERROR)
        .json({ error: this.errors.internal });
    }
  };

  public delete = async (
    req: Request<{ id: string }>,
    res: Response<IMotorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;

    try {
      const removedMotorcycle = await this.motorcycleService.delete(id);

      if (!removedMotorcycle) {
        return res.status(StatusCode.HTTP_NOT_FOUND)
          .json({ error: this.errors.notFound });
      }

      return res.status(StatusCode.HTTP_NO_CONTENT).json(removedMotorcycle);
    } catch (error) {
      return res.status(StatusCode.HTTP_INTERNAL_SERVER_ERROR)
        .json({ error: this.errors.internal });
    }
  };
}

export default MotorcycleController;
