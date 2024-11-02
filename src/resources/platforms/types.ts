import type { z } from 'zod'
import type {
  PlatformContainerSchema,
  PlatformSchema,
  PlatformsFilterSchema,
  PartialPlatformSchema,
} from '@resources/platforms/schemas'

export type PartialPlatform = z.infer<typeof PartialPlatformSchema>

export type Platform = z.infer<typeof PlatformSchema>

export type PlatformContainer = z.infer<typeof PlatformContainerSchema>

export type PlatformsFilter = z.infer<typeof PlatformsFilterSchema>
