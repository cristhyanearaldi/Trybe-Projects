import CarModel from '../models/CarModel';
import { Car as ICar, VehicleCar } from '../interfaces/CarInterface';
import MongoService, { ServiceError } from '.';

class CarService extends MongoService<ICar> {
  constructor(public carModel = new CarModel()) {
    super(carModel);
  }
  
  public create = async (obj: ICar): Promise<ICar | null | ServiceError> => {
    const parsed = VehicleCar.safeParse(obj);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.carModel.create(obj);
  };
}

export default CarService;
