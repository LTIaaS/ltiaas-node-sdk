import { z } from 'zod'
import { PlatformAuthenticationMethod } from '@resources/platforms/enums'

export const PartialPlatformSchema = z
  .object({
    url: z.string(),
    clientId: z.string(),
    name: z.string(),
    authenticationEndpoint: z.string(),
    accesstokenEndpoint: z.string(),
    authConfig: z.object({
      key: z.string(),
      method: z.nativeEnum(PlatformAuthenticationMethod),
    }),
    authorizationServer: z.string().optional(),
    active: z.boolean().optional(),
  })
  .passthrough()

export const PlatformSchema = PartialPlatformSchema.extend({
  id: z.string(),
  publicKey: z.string(),
})

export const PlatformContainerSchema = z.object({
  platforms: z.array(PlatformSchema),
})

export const PlatformsFilterSchema = z.object({
  url: z.string().url().optional(),
  clientId: z.string().optional(),
})
