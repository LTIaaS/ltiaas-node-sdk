import type { z } from 'zod'
import type { ScoreSchema, ResultContainerSchema, ResultsFilterSchema } from '@resources/scores/schemas'

export type Score = z.infer<typeof ScoreSchema>

export type ResultContainer = z.infer<typeof ResultContainerSchema>

export type ResultsFilter = z.infer<typeof ResultsFilterSchema>
