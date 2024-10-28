import { z } from 'zod'

const DOMAIN_MATCHING_REGEX = /^((?!-)[A-Za-z0–9-]{1, 63}(?<!-)\.)+[A-Za-z]{2, 6}$/
const SUBDOMAIN_MATCHING_REGEX = /^[A-Za-z0-9-]{3,}$/

export const ClientOptionsSchema = z
  .object({
    apiKey: z.string(),
    domain: z.string().regex(DOMAIN_MATCHING_REGEX, { message: 'Invalid domain.' }).optional(),
    subdomain: z
      .string()
      .regex(SUBDOMAIN_MATCHING_REGEX, { message: 'Invalid subdomain.' })
      .optional(),
  })
  .refine(
    data => data.domain != null || data.subdomain != null,
    'Either domain or subdomain must be provided',
  )
