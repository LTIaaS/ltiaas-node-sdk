import type { AxiosError } from 'axios'
import z from 'zod'

const LTIAASErrorResponse = z.object({
  status: z.number(),
  error: z.string(),
  details: z
    .object({
      message: z.string().optional(),
      bodyReceived: z.unknown().optional(),
      externalError: z.boolean().optional(),
      externalUrl: z.string().optional(),
    })
    .optional(),
})

type LTIAASError = z.infer<typeof LTIAASErrorResponse>

export class APIError extends Error {
  public readonly response?: LTIAASError

  constructor(error: AxiosError) {
    if (error.response === undefined) {
      super('An unexpected error occurred')
      return
    }

    const parseResult = LTIAASErrorResponse.safeParse(error.response.data)
    if (parseResult.success) {
      super(parseResult.data.error)
      this.response = parseResult.data
      return
    }

    super('An unexpected error occurred')
    this.response = {
      status: error.response.status,
      error: error.response.statusText,
      details: {
        bodyReceived: error.response.data,
        externalError: true,
      },
    }
  }
}
