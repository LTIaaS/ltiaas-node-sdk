import type { LaunchClientOptions } from '@client/types'
import type { IDToken, LTIVersionPartial, RawIDToken, RawOauthPayload } from '@resources/idtoken/types'
import type { MembershipContainer } from '@resources/memberships/types'
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
import { MembershipContainerSchema } from '@/resources/memberships/schemas'

export class LTIAASLaunch extends BaseLTIAASClient {
  protected readonly serviceAuthorization: string
  private readonly sessionType: SessionType

  constructor(options: LaunchClientOptions) {
    super(options)
    this.sessionType = this.determineSessionType(options)
    this.serviceAuthorization = this.buildServiceAuthorization(options)
  }

  protected validateOptions(options: LaunchClientOptions): LaunchClientOptions {
    return validate<LaunchClientOptions>(LaunchClientOptionsSchema, options)
  }

  private determineSessionType(options: LaunchClientOptions): SessionType {
    if ('ltik' in options) return SessionType.LTIK
    if ('serviceKey' in options) return SessionType.SERVICE_KEY
    return SessionType.API_KEY
  }

  private buildServiceAuthorization(options: LaunchClientOptions): string {
    switch (this.sessionType) {
      case SessionType.LTIK:
        return `LTIK-AUTH-V2 ${options.apiKey}:${options.ltik}`
      case SessionType.SERVICE_KEY:
        return `SERVICE-AUTH-V1 ${options.apiKey}:${options.serviceKey}`
      case SessionType.API_KEY:
        return `Bearer ${options.apiKey}`
    }
  }

  private validateSessionType(...allowedSessionTypes: SessionType[]): void {
    if (!allowedSessionTypes.includes(this.sessionType)) {
      throw new InvalidSessionError(this.sessionType, allowedSessionTypes)
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

  public async getMembershipts(): Promise<MembershipContainer> {
    this.validateSessionType(SessionType.LTIK, SessionType.SERVICE_KEY)
    const data = await get(this.session, this.serviceAuthorization, '/api/memberships')
    return validate<MembershipContainer>(MembershipContainerSchema, data)
  }
}
