import { z } from 'zod';

const VehicleSchema = z.object({
  model: z
    .string({ invalid_type_error: 'model must be a string' })
    .min(3, { message: 'model must be 3 or more characters long' }),
  year: z
    .number({ invalid_type_error: 'year must be a number' })
    .gte(1900, { message: 'year must be greater than or equal to 1900' })
    .lte(2022, { message: 'year must be less than or equal to 2022' }),
  color: z.string({ invalid_type_error: 'color must be a string' })
    .min(3, { message: 'color must be 3 or more characters long' }),
  status: z
    .boolean({ invalid_type_error: 'status must be a boolean' })
    .optional(),
  buyValue: z
    .number({ invalid_type_error: 'buyValue must be a number' })
    .int({ message: 'buyValue must be a integer' }),
});

type Vehicle = z.infer<typeof VehicleSchema>;

export { 
  VehicleSchema,
  Vehicle,
};
