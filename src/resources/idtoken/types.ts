import type { z } from 'zod'
import type {
  IDTokenSchema,
  LTIVersionPartialSchema,
  RawIDTokenSchema,
  RawOauthPayloadSchema,
} from '@resources/idtoken/schemas'

export type LTIVersionPartial = z.infer<typeof LTIVersionPartialSchema>

export type IDToken = z.infer<typeof IDTokenSchema>

export type RawIDToken = z.infer<typeof RawIDTokenSchema>

export type RawOauthPayload = z.infer<typeof RawOauthPayloadSchema>
