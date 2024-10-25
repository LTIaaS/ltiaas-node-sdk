import { z } from 'zod'

export const ClientOptionsSchema = z
  .object({
    apiKey: z.string(),
    domain: z.string().optional(),
    subdomain: z.string().optional(),
  })
  .refine(
    data => data.domain != null || data.subdomain != null,
    'Either domain or subdomain must be provided',
  )

export type ClientOptions = z.infer<typeof ClientOptionsSchema>
