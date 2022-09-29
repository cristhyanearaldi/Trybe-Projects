import { z } from 'zod';
import { VehicleSchema } from './VehicleInterface';

const CarSchema = z.object({
  doorsQty: z
    .number({ invalid_type_error: 'doorsQty must be a number' })
    .gte(2, { message: 'year must be greater than or equal to 2' })
    .lte(4, { message: 'year must be less than or equal to 4' }),
  seatsQty: z
    .number({ invalid_type_error: 'seatsQty must be a number' })
    .gte(2, { message: 'year must be greater than or equal to 2' })
    .lte(7, { message: 'year must be less than or equal to 7' }),
});

const VehicleCar = z.intersection(VehicleSchema, CarSchema);

type Car = z.infer<typeof VehicleCar>;

export {
  VehicleCar,
  Car,
};

// Source: 'https://github.com/colinhacks/zod#defining-schemas'
