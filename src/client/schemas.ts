import { z } from 'zod'

const DOMAIN_MATCHING_REGEX = /^(?!-)([A-Za-z0-9-]{1,63}\.)+[A-Za-z]{2,6}$/

const MISSING_DOMAIN_INFORMATION = 'Either domain or subdomain must be provided.'
const MISSING_TOKEN_INFORMATION = 'Either ltik or serviceKey must be provided.'

export const ClientOptionsSchema = z.object({
  apiKey: z.string(),
  domain: z
    .string({ required_error: MISSING_DOMAIN_INFORMATION })
    .regex(DOMAIN_MATCHING_REGEX, { message: 'Invalid domain.' }),
})

const LaunchOptionsSchema = ClientOptionsSchema.merge(
  z.object({
    ltik: z.string({ required_error: MISSING_TOKEN_INFORMATION }),
  }),
)

const AsyncLaunchOptionsSchema = ClientOptionsSchema.merge(
  z.object({
    serviceKey: z.string({ required_error: MISSING_TOKEN_INFORMATION }),
  }),
)

export const LaunchClientOptionsSchema = z.union([LaunchOptionsSchema, AsyncLaunchOptionsSchema])
