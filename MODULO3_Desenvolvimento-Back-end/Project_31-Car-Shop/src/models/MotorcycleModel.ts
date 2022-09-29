import mongoose from 'mongoose';
import { Motorcycle as IMotorcycle } from '../interfaces/MotorcycleInterface';
import MongoModel from './MongoModel';

interface MotorcycleDocument extends IMotorcycle, mongoose.Document {}

const motorcycleSchema = new mongoose.Schema<MotorcycleDocument>({
  model: { type: String, required: true },
  year: { type: Number, required: true },
  color: { type: String, required: true },
  status: { type: Boolean, required: false },
  buyValue: { type: Number, required: true },
  category: { type: String, required: true },
  engineCapacity: { type: Number, required: true },
}, {
  versionKey: false,
});

class MotorcycleModel extends MongoModel<IMotorcycle> {
  constructor(public model = mongoose.model('Motorcycles', motorcycleSchema)) {
    super(model);
  }
}

export default MotorcycleModel;
