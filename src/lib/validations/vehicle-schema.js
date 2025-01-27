// lib/validations/vehicle-schema.js
import { z } from 'zod';

export const VehicleSchema = {
  create: z.object({
    registration_number: z.string().min(1, 'Registration number is required'),
  }),

  update: z.object({
    registration_number: z.string().min(1, 'Registration number must be a valid string').optional(),
    notification_enabled: z.boolean().optional()
  }).refine(data => 
    data.registration_number !== undefined || 
    data.notification_enabled !== undefined, 
    'At least one field (registration_number or notification_enabled) must be provided'
  )
};