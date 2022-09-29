import { Model as M, Document } from 'mongoose';
import { Model } from '../interfaces/ModelInterface';

abstract class MongoModel<T> implements Model<T> {
  constructor(protected model: M<T & Document>) {}

  public create = async (obj: T): Promise<T> => {
    const objCreated = await this.model.create(obj);
    return objCreated;
  };

  public read = async (): Promise<T[]> => {
    const objsList = await this.model.find();
    return objsList;
  };

  public readOne = async (id: string): Promise<T | null> => {
    const obj = await this.model.findById(id);
    return obj;
  };

  public update = async (id: string, obj: T): Promise<T | null> => {
    const objUpdated = await this.model.findByIdAndUpdate(id, obj);
    return objUpdated;
  };

  public delete = async (id: string): Promise<T | null> => {
    const objRemoved = await this.model.findByIdAndDelete(id);
    return objRemoved;
  };
}

export default MongoModel;
