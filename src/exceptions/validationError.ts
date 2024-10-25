import type { ZodError } from 'zod'

type ErrorObject = { _errors: string[]; [key: string]: ErrorObject | string[] }
type FlattenedErrors = Record<string, string[]>

const flattenErrors = (
  obj: ErrorObject,
  parentKey = '',
  result: FlattenedErrors = {},
): FlattenedErrors => {
  for (const key in obj) {
    if (key === '_errors' && obj._errors.length > 0) {
      result[parentKey] = obj._errors
      continue
    }
    const newKey = parentKey.length > 0 ? `${parentKey}__${key}` : key
    flattenErrors(obj[key] as ErrorObject, newKey, result)
  }
  return result
}

export class ValidationError extends Error {
  private static readonly ERROR_INDENTATION_SPACES = 2
  public readonly errors: FlattenedErrors

  constructor(zodError: ZodError) {
    const errors = flattenErrors(zodError.format())
    const message =
      Object.hasOwn(errors, '') && errors[''].length === 1
        ? JSON.stringify(errors[''][0])
        : JSON.stringify(errors, null, ValidationError.ERROR_INDENTATION_SPACES)
    super(message)
    this.errors = errors
  }
}
