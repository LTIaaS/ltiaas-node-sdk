import { z } from 'zod'
import { LTILaunchType } from '@resources/idtoken/enums'

export const RegistrationRequestSchema = z.object({
  url: z.string(),
  familyCode: z.string(),
  version: z.string(),
  supportedScopes: z.array(z.string()),
  supportedMessages: z.array(
    z.object({
      type: z.nativeEnum(LTILaunchType),
      placements: z.array(z.string()).optional(),
    }),
  ),
})

export const RegistrationOptionsSchema = z.object({
  platformName: z.string().optional(),
  autoActivate: z.boolean().optional(),
  messages: z
    .array(
      z.object({
        type: z.string(),
        placements: z.array(z.string()).optional(),
      }),
    )
    .optional(),
})

export const RegistrationCompletionSchema = z.object({
  html: z.string(),
  platformId: z.string(),
})
