import type { LaunchClientOptions } from '@client/types'
import type { IDToken, LTIVersionPartial, RawIDToken, RawOauthPayload } from '@resources/idtoken/types'
import { get } from '@utils/requests'
import { validate } from '@utils/validation'
import { SessionType } from '@client/enums'
import { BaseLTIAASClient } from '@client/base'
import { LaunchClientOptionsSchema } from '@client/schemas'
import {
  IDTokenSchema,
  LTIVersionPartialSchema,
  RawIDTokenSchema,
  RawOauthPayloadSchema,
} from '@resources/idtoken/schemas'
import { InvalidSessionError } from '@exceptions/invalidSessionError'
import { LTIVersion } from '@resources/idtoken/enums'

export class LTIAASLaunch extends BaseLTIAASClient {
  protected readonly serviceAuthorization: string
  private readonly sessionType: SessionType

  constructor(options: LaunchClientOptions) {
    super(options)
    if ('ltik' in options) {
      this.sessionType = SessionType.LTIK
      this.serviceAuthorization = this.buildLTIKAuthorization(options.apiKey, options.ltik)
    } else {
      this.sessionType = SessionType.SERVICE_KEY
      this.serviceAuthorization = this.buildServiceKeyAuthorization(options.apiKey, options.serviceKey)
    }
  }

  protected validateOptions(options: LaunchClientOptions): LaunchClientOptions {
    return validate<LaunchClientOptions>(LaunchClientOptionsSchema, options)
  }

  private buildLTIKAuthorization(apiKey: string, ltik: string): string {
    return `LTIK-AUTH-V2 ${apiKey}:${ltik}`
  }

  private buildServiceKeyAuthorization(apiKey: string, serviceKey: string): string {
    return `SERVICE-AUTH-V1 ${apiKey}:${serviceKey}`
  }

  private validateSessionType(requiredSession: SessionType): void {
    if (this.sessionType !== requiredSession) {
      throw new InvalidSessionError(this.sessionType, requiredSession)
    }
  }

  public async getIdToken(): Promise<IDToken> {
    this.validateSessionType(SessionType.LTIK)
    const data = await get(this.session, this.serviceAuthorization, '/api/idtoken')
    return validate<IDToken>(IDTokenSchema, data)
  }

  public async getRawIdToken(): Promise<RawIDToken | RawOauthPayload> {
    this.validateSessionType(SessionType.LTIK)
    const data = await get(this.session, this.serviceAuthorization, '/api/idtoken', { raw: true })
    const partial = validate<LTIVersionPartial>(LTIVersionPartialSchema, data)
    if (partial.ltiVersion === LTIVersion.LTI_1_3) return validate<RawIDToken>(RawIDTokenSchema, data)
    return validate<RawOauthPayload>(RawOauthPayloadSchema, data)
  }
}
