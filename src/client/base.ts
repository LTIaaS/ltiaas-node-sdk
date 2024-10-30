import axios, { type AxiosInstance } from 'axios'
import type { ClientOptions } from '@client/types'
import { ClientOptionsSchema } from '@client/schemas'
import { validate } from '@utils/validation'

export class BaseLTIAASClient {
  protected readonly bearerAuthorization: string
  protected readonly session: AxiosInstance

  constructor(options: ClientOptions) {
    options = this.validateOptions(options)
    this.bearerAuthorization = this.buildBearerAuthorization(options.apiKey)
    this.session = axios.create({ baseURL: `https://${options.domain}` })
  }

  protected validateOptions(options: ClientOptions): ClientOptions {
    return validate<ClientOptions>(ClientOptionsSchema, options)
  }

  private buildBearerAuthorization(apiKey: string): string {
    return `Bearer ${apiKey}`
  }
}
