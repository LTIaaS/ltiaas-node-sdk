import { z } from 'zod'

export const PartialLineItemSchema = z
  .object({
    label: z.string(),
    scoreMaximum: z.number(),
    resourceLinkId: z.string().optional(),
    resourceId: z.string().optional(),
    tag: z.string().optional(),
    startDateTime: z.string().datetime({ offset: true }).optional(),
    endDateTime: z.string().datetime({ offset: true }).optional(),
    gradesReleased: z.boolean().optional(),
  })
  .passthrough()

export const LineItemSchema = PartialLineItemSchema.extend({
  id: z.string(),
})

export const LineItemContainerSchema = z.object({
  lineItems: z.array(LineItemSchema),
  next: z.string().optional(),
  first: z.string().optional(),
  last: z.string().optional(),
  prev: z.string().optional(),
})

export const LineItemsFilterSchema = z.object({
  resourceLinkId: z.string().optional(),
  resourceId: z.string().optional(),
  tag: z.string().optional(),
  limit: z.number().optional(),
  url: z
    .string()
    .url()
    .optional()
    .transform(v => (v === undefined ? v : encodeURIComponent(v))),
})
