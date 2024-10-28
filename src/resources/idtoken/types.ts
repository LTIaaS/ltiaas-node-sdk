import type { z } from 'zod'
import type { IDTokenSchema, RawIDTokenSchema } from '@resources/idtoken/schemas'

export type IDToken = z.infer<typeof IDTokenSchema>

export type RawIDToken = z.infer<typeof RawIDTokenSchema>
