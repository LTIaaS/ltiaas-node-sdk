import { z } from 'zod'

export const PartialScoreSchema = z
  .object({
    userId: z.string(),
    scoreOf: z.string(),
    timestamp: z.string().datetime({ offset: true }),
    resultScore: z.number().optional(),
    resultMaximum: z.number().optional(),
    comment: z.string().optional(),
  })
  .passthrough()

export const ScoreSchema = PartialScoreSchema.extend({
  id: z.string(),
})

export const ScoreContainerSchema = z.object({
  scores: z.array(ScoreSchema),
  next: z.string().optional(),
  first: z.string().optional(),
  last: z.string().optional(),
  prev: z.string().optional(),
})

export const ScoresFilterSchema = z.object({
  userId: z.string().optional(),
  limit: z.number().optional(),
  url: z.string().url().optional(),
})
