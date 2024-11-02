import type { z } from 'zod'
import type {
  LineItemContainerSchema,
  LineItemSchema,
  LineItemsFilterSchema,
  PartialLineItemSchema,
} from '@resources/lineitems/schemas'

export type PartialLineItem = z.infer<typeof PartialLineItemSchema>

export type LineItem = z.infer<typeof LineItemSchema>

export type LineItemContainer = z.infer<typeof LineItemContainerSchema>

export type LineItemsFilter = z.infer<typeof LineItemsFilterSchema>
