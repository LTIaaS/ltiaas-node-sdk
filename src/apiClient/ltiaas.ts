import axios from 'axios'

import { type HTTPConfig, type ClientOptions, ClientOptionsSchema } from '@client/types'
import { validate } from '@utils/validation'

export class LTIAASClient {
  private static readonly LTIAAS_DOMAIN = 'ltiaas.com'
  private readonly httpConfig: HTTPConfig

  constructor(options: ClientOptions) {
    options = validate<ClientOptions>(ClientOptionsSchema, options)
    this.httpConfig = {
      apiKey: options.apiKey,
      client: axios.create({
        baseURL: LTIAASClient.buildBaseUrl(options.domain, options.subdomain),
      }),
    }
  }

  private static buildBaseUrl(domain?: string, subdomain?: string): string {
    return domain !== undefined
      ? `https://${domain}`
      : `https://${subdomain}.${LTIAASClient.LTIAAS_DOMAIN}`
  }

  // public async getIdToken(): Promise<void> {}
}
