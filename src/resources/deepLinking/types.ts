import type { z } from 'zod'
import type { ContentItemSchema } from '@resources/deepLinking/schemas'

export type ContentItem = z.infer<typeof ContentItemSchema>
