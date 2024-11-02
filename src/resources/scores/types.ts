import type { z } from 'zod'
import type { ScoreContainerSchema, ScoresFilterSchema, PartialScoreSchema } from '@resources/scores/schemas'

export type PartialScore = z.infer<typeof PartialScoreSchema>

export type ScoreContainer = z.infer<typeof ScoreContainerSchema>

export type ScoresFilter = z.infer<typeof ScoresFilterSchema>
