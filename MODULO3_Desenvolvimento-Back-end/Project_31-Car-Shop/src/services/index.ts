import { ZodError } from 'zod';
import { Model } from '../interfaces/ModelInterface';

export interface ServiceError {
  error: ZodError;
}

abstract class MongoService<T> {
  constructor(protected model: Model<T>) {}

  public async create(obj: T): Promise<T | null | ServiceError> {
    const objCreated = await this.model.create(obj);
    return objCreated;
  }

  public async read(): Promise<T[]> {
    const objsList = await this.model.read();
    return objsList;
  }

  public async readOne(id: string): Promise<T | null | ServiceError> {
    const obj = await this.model.readOne(id);
    return obj;
  }

  public async update(id: string, obj: T): Promise<T | null | ServiceError> {
    const objUpdated = await this.model.update(id, obj);
    return objUpdated;
  }

  public async delete(id: string): Promise<T | null | ServiceError> {
    const objRemoved = await this.model.delete(id);
    return objRemoved;
  }
}

export default MongoService;
