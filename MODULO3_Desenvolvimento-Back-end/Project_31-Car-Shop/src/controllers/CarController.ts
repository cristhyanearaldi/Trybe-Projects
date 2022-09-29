import { Request, Response } from 'express';
import MongoController, { RequestWithBody, ResponseError } from '.';
import StatusCode from '../enums/StatusCode';
import { Car as ICar } from '../interfaces/CarInterface';
import CarService from '../services/CarService';

class CarController extends MongoController<ICar> {
  private _route: string;

  constructor(
    public carService = new CarService(),
    route = '/cars',
  ) {
    super(carService);
    this._route = route;
  }

  get route() {
    return this._route;
  }

  public create = async (
    req: RequestWithBody<ICar>, 
    res: Response<ICar | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const newCar = await this.carService.create(req.body);

      if (!newCar) {
        return res.status(StatusCode.HTTP_INTERNAL_SERVER_ERROR)
          .json({ error: this.errors.internal });
      }

      if ('error' in newCar) {
        return res.status(StatusCode.HTTP_BAD_REQUEST).json(newCar);
      }

      return res.status(StatusCode.HTTP_CREATED).json(newCar);
    } catch (error) {
      return res.status(StatusCode.HTTP_INTERNAL_SERVER_ERROR)
        .json({ error: this.errors.internal });
    }
  };

  public read = async (
    req: Request, 
    res: Response<ICar[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const cars = await this.carService.read();
      return res.status(StatusCode.HTTP_OK).json(cars);
    } catch (error) {
      return res.status(StatusCode.HTTP_INTERNAL_SERVER_ERROR)
        .json({ error: this.errors.internal });
    }
  };

  public readOne = async (
    req: Request<{ id: string }>, 
    res: Response<ICar | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      const car = await this.carService.readOne(id);
      if (!car) {
        return res.status(StatusCode.HTTP_NOT_FOUND)
          .json({ error: this.errors.notFound });
      }
      return res.status(StatusCode.HTTP_OK).json(car);
    } catch (error) {
      return res.status(StatusCode.HTTP_INTERNAL_SERVER_ERROR)
        .json({ error: this.errors.internal });
    }
  };

  public update = async (
    req: Request<{ id: string }>, 
    res: Response<ICar | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;

    try {
      const updatedCar = await this.carService.update(id, req.body);

      if (!updatedCar) {
        return res.status(StatusCode.HTTP_NOT_FOUND)
          .json({ error: this.errors.notFound });
      }

      return res.status(StatusCode.HTTP_OK).json(updatedCar);
    } catch (error) {
      return res.status(StatusCode.HTTP_INTERNAL_SERVER_ERROR)
        .json({ error: this.errors.internal });
    }
  };

  public delete = async (
    req: Request<{ id: string }>,
    res: Response<ICar | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;

    try {
      const removedCar = await this.carService.delete(id);

      if (!removedCar) {
        return res.status(StatusCode.HTTP_NOT_FOUND)
          .json({ error: this.errors.notFound });
      }

      return res.status(StatusCode.HTTP_NO_CONTENT).json(removedCar);
    } catch (error) {
      return res.status(StatusCode.HTTP_INTERNAL_SERVER_ERROR)
        .json({ error: this.errors.internal });
    }
  };
}

export default CarController;
