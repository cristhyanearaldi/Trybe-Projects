import { z } from 'zod';
import { VehicleSchema } from './VehicleInterface';

const MotorcycleSchema = z.object({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z
    .number({ invalid_type_error: 'engineCapacity must be a number' })
    .int({ message: 'engineCapacity must be a integer' })
    .gt(0, { message: 'engineCapacity must be greater than 0' })
    .lte(2500, { 
      message: 'engineCapacity must be less than or equal to 2500',
    }),
});

const VehicleMotorcycle = z.intersection(VehicleSchema, MotorcycleSchema);

type Motorcycle = z.infer<typeof VehicleMotorcycle>;

export {
  VehicleMotorcycle,
  Motorcycle,
};