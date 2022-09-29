import mongoose from 'mongoose';
import { Car as ICar } from '../interfaces/CarInterface';
import MongoModel from './MongoModel';

interface CarDocument extends ICar, mongoose.Document {} 

const carSchema = new mongoose.Schema<CarDocument>({
  model: { type: String, required: true },
  year: { type: Number, required: true },
  color: { type: String, required: true },
  status: { type: Boolean, required: false },
  buyValue: { type: Number, required: true },
  doorsQty: { type: Number, required: true },
  seatsQty: { type: Number, required: true },
}, {
  versionKey: false,
});

class CarModel extends MongoModel<ICar> {
  constructor(public model = mongoose.model('Cars', carSchema)) {
    super(model);
  }
}

export default CarModel;
