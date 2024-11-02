import type { z } from 'zod'
import type {
  IdTokenSchema,
  LTIVersionPartialSchema,
  RawIdTokenSchema,
  RawOauthPayloadSchema,
} from '@resources/idtoken/schemas'

export type LTIVersionPartial = z.infer<typeof LTIVersionPartialSchema>

export type IdToken = z.infer<typeof IdTokenSchema>

export type RawIdToken = z.infer<typeof RawIdTokenSchema>

export type RawOauthPayload = z.infer<typeof RawOauthPayloadSchema>
