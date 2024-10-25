import { ZodError, type ZodSchema } from 'zod'
import { ValidationError } from '@/exceptions/validationError'

export const validate = <Type>(schema: ZodSchema, value: Type): Type => {
  try {
    return schema.parse(value) as Type
  } catch (error) {
    if (!(error instanceof ZodError)) throw new Error('Unexpected error', { cause: error })
    throw new ValidationError(error)
  }
}
