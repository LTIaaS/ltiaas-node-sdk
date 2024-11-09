import type { z } from 'zod'
import type {
  RawRegistrationRequestSchema,
  RegistrationCompletionSchema,
  RegistrationOptionsSchema,
  RegistrationRequestSchema,
} from '@resources/registrations/schemas'

export type RegistrationOptions = z.infer<typeof RegistrationOptionsSchema>

export type RegistrationRequest = z.infer<typeof RegistrationRequestSchema>

export type RawRegistrationRequest = z.infer<typeof RawRegistrationRequestSchema>

export type RegistrationCompletion = z.infer<typeof RegistrationCompletionSchema>
