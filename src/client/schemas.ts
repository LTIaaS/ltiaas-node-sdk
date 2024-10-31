import { z } from 'zod'

const DOMAIN_MATCHING_REGEX = /^(?!-)([A-Za-z0-9-]{1,63}\.)+[A-Za-z]{2,6}$/

const MISSING_DOMAIN_INFORMATION = 'Either domain or subdomain must be provided.'

export const ClientOptionsSchema = z.object({
  apiKey: z.string(),
  domain: z
    .string({ required_error: MISSING_DOMAIN_INFORMATION })
    .regex(DOMAIN_MATCHING_REGEX, { message: 'Invalid domain.' }),
})

export const LaunchClientOptionsSchema = ClientOptionsSchema.extend({
  ltik: z.string().optional(),
  serviceKey: z.string().optional(),
})
