import type { ClientOptions } from '@client/types'
import { ClientOptionsSchema } from '@client/schemas'
import { validate } from '@utils/validation'
import { RequestHandler } from '@client/requestHandler'

export class BaseLTIAASClient {
  protected readonly bearerAuthorization: string
  protected readonly requestHandler: RequestHandler

  constructor(options: ClientOptions) {
    options = this.validateOptions(options)
    this.bearerAuthorization = this.buildBearerAuthorization(options.apiKey)
    this.requestHandler = new RequestHandler(`https://${options.domain}`)
  }

  protected validateOptions(options: ClientOptions): ClientOptions {
    return validate<ClientOptions>(ClientOptionsSchema, options)
  }

  private buildBearerAuthorization(apiKey: string): string {
    return `Bearer ${apiKey}`
  }
}
