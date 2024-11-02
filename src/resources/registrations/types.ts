import type { z } from 'zod'
import type {
  RegistrationCompletionSchema,
  RegistrationOptionsSchema,
  RegistrationRequestSchema,
} from '@resources/registrations/schemas'

export type RegistrationOptions = z.infer<typeof RegistrationOptionsSchema>

export type RegistrationRequest = z.infer<typeof RegistrationRequestSchema>

export type RegistrationCompletion = z.infer<typeof RegistrationCompletionSchema>
