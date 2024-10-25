import axios from 'axios'
import { type ClientOptions, ClientOptionsSchema } from '@client/types/clientOptions'
import type { HTTPConfig } from '@/apiClient/types/httpConfig'
import { validate } from '@utils/validation'

export class LTIAASClient {
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
    return ''
  }
}
