import { z } from 'zod'
import { ActivityProgress, GradingProgress } from '@resources/scores/enums'

export const ResultSchema = z
  .object({
    id: z.string(),
    userId: z.string(),
    scoreOf: z.string(),
    resultScore: z.number().optional(),
    resultMaximum: z.number().optional(),
    comment: z.string().optional(),
  })
  .passthrough()

export const ScoreSchema = z
  .object({
    userId: z.string().or(z.number()),
    activityProgress: z.nativeEnum(ActivityProgress),
    gradingProgress: z.nativeEnum(GradingProgress),
    scoreGiven: z.number().positive().optional(),
    scoreMaximum: z.number().positive().optional(),
    comment: z.string().optional(),
  })
  .passthrough()
  .refine(data => {
    return !(data.scoreGiven !== undefined && data.scoreMaximum === undefined)
  }, 'The scoreMaximum must be defined if scoreGiven is defined')

export const ResultContainerSchema = z.object({
  scores: z.array(ResultSchema),
  next: z.string().optional(),
  first: z.string().optional(),
  last: z.string().optional(),
  prev: z.string().optional(),
})

export const ResultsFilterSchema = z.object({
  userId: z.string().optional(),
  limit: z.number().optional(),
  url: z
    .string()
    .url()
    .optional()
    .transform(v => (v === undefined ? v : encodeURIComponent(v))),
})
