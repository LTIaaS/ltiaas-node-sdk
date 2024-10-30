import type { z } from 'zod'
import type { ClientOptionsSchema, LaunchClientOptionsSchema } from '@client/schemas'

export type ClientOptions = z.infer<typeof ClientOptionsSchema>

export type LaunchClientOptions = z.infer<typeof LaunchClientOptionsSchema>
