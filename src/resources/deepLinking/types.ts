import type { z } from 'zod'
import type {
  ContentItemSchema,
  DeepLinkingFormComponentsSchema,
  DeepLinkingFormResponseSchema,
  DeepLinkingOptionsSchema,
} from '@resources/deepLinking/schemas'

export type ContentItem = z.infer<typeof ContentItemSchema>

export type DeepLinkingOptions = z.infer<typeof DeepLinkingOptionsSchema>

export type DeepLinkingFormResponse = z.infer<typeof DeepLinkingFormResponseSchema>

export type DeepLinkingFormComponents = z.infer<typeof DeepLinkingFormComponentsSchema>
