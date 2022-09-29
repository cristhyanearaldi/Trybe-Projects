import MongoService, { ServiceError } from '.';
import { 
  Motorcycle as IMotorcycle, 
  VehicleMotorcycle,
} from '../interfaces/MotorcycleInterface';
import MotorcycleModel from '../models/MotorcycleModel';

class MotorcycleService extends MongoService<IMotorcycle> {
  constructor(public motorcycleModel = new MotorcycleModel()) {
    super(motorcycleModel);
  }

  public create = async (
    obj: IMotorcycle,
  ): Promise<IMotorcycle | null | ServiceError> => {
    const parsed = VehicleMotorcycle.safeParse(obj);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.motorcycleModel.create(obj);
  };
}

export default MotorcycleService;
