import type { z } from 'zod'
import type { AxiosInstance } from 'axios'
import type { ClientOptionsSchema } from '@client/schemas'

export type HTTPConfig = {
  client: AxiosInstance
  apiKey: string
}

export type ClientOptions = z.infer<typeof ClientOptionsSchema>
