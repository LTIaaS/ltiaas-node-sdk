import type { LaunchClientOptions } from '@client/types'
import type { IdToken, LTIVersionPartial, RawIdToken, RawOauthPayload } from '@resources/idtoken/types'
import type { MembershipContainer, MembershipsFilter } from '@resources/memberships/types'
import type { LineItem, LineItemContainer, LineItemsFilter, PartialLineItem } from '@resources/lineitems/types'
import type { PartialScore, ScoreContainer, ScoresFilter } from '@resources/scores/types'
import type { RegistrationRequest, RegistrationOptions, RegistrationCompletion } from '@resources/registrations/types'
import type {
  ContentItem,
  DeepLinkingFormComponents,
  DeepLinkingFormResponse,
  DeepLinkingOptions,
} from '@resources/deepLinking/types'
import { validate } from '@utils/validation'
import { SessionType } from '@client/enums'
import { BaseLTIAASClient } from '@client/base'
import { LaunchClientOptionsSchema } from '@client/schemas'
import {
  IdTokenSchema,
  LTIVersionPartialSchema,
  RawIdTokenSchema,
  RawOauthPayloadSchema,
} from '@resources/idtoken/schemas'
import { InvalidSessionError } from '@exceptions/invalidSessionError'
import { LTIVersion } from '@resources/idtoken/enums'
import { MembershipContainerSchema, MembershipsFilterSchema } from '@resources/memberships/schemas'
import {
  ContentItemsSchema,
  DeepLinkingFormComponentsSchema,
  DeepLinkingFormResponseSchema,
  DeepLinkingOptionsSchema,
} from '@resources/deepLinking/schemas'
import {
  LineItemContainerSchema,
  LineItemSchema,
  LineItemsFilterSchema,
  PartialLineItemSchema,
} from '@resources/lineitems/schemas'
import { PartialScoreSchema, ScoreContainerSchema, ScoresFilterSchema } from '@resources/scores/schemas'
import {
  RegistrationCompletionSchema,
  RegistrationOptionsSchema,
  RegistrationRequestSchema,
} from '@/resources/registrations/schemas'

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

  public async getIdToken(): Promise<IdToken> {
    this.validateSessionType(SessionType.LTIK)
    const data = await this.requestHandler.get(this.serviceAuthorization, '/api/idtoken')
    return validate<IdToken>(IdTokenSchema, data)
  }

  public async getRawIdToken(): Promise<RawIdToken | RawOauthPayload> {
    this.validateSessionType(SessionType.LTIK)
    const data = await this.requestHandler.get(this.serviceAuthorization, '/api/idtoken', { raw: true })
    const partial = validate<LTIVersionPartial>(LTIVersionPartialSchema, data)
    if (partial.ltiVersion === LTIVersion.LTI_1_3) return validate<RawIdToken>(RawIdTokenSchema, data)
    return validate<RawOauthPayload>(RawOauthPayloadSchema, data)
  }

  public async buildDeepLinkingForm(contentItems: ContentItem[], options?: DeepLinkingOptions): Promise<string> {
    this.validateSessionType(SessionType.LTIK)
    validate<ContentItem[]>(ContentItemsSchema, contentItems)
    if (options !== undefined) validate<DeepLinkingOptions>(DeepLinkingOptionsSchema, options)
    const data = await this.requestHandler.post(this.serviceAuthorization, '/api/deeplinking/form', {
      contentItems,
      options,
    })
    return validate<DeepLinkingFormResponse>(DeepLinkingFormResponseSchema, data).form
  }

  public async buildDeepLinkingFormComponents(
    contentItems: ContentItem[],
    options?: DeepLinkingOptions,
  ): Promise<DeepLinkingFormComponents> {
    this.validateSessionType(SessionType.LTIK)
    validate<ContentItem[]>(ContentItemsSchema, contentItems)
    if (options !== undefined) validate<DeepLinkingOptions>(DeepLinkingOptionsSchema, options)
    const data = await this.requestHandler.post(this.serviceAuthorization, '/api/deeplinking', {
      contentItems,
      options,
    })
    return validate<DeepLinkingFormComponents>(DeepLinkingFormComponentsSchema, data)
  }

  public async getMemberships(filters?: MembershipsFilter): Promise<MembershipContainer> {
    this.validateSessionType(SessionType.LTIK, SessionType.SERVICE_KEY)
    if (filters !== undefined) validate<MembershipsFilter>(MembershipsFilterSchema, filters)
    const data = await this.requestHandler.get(this.serviceAuthorization, '/api/memberships', filters)
    return validate<MembershipContainer>(MembershipContainerSchema, data)
  }

  public async getLineItems(filters?: LineItemsFilter): Promise<LineItemContainer> {
    this.validateSessionType(SessionType.LTIK, SessionType.SERVICE_KEY)
    if (filters !== undefined) validate<LineItemsFilter>(LineItemsFilterSchema, filters)
    const data = await this.requestHandler.get(this.serviceAuthorization, '/api/lineitems', filters)
    return validate<LineItemContainer>(LineItemContainerSchema, data)
  }

  public async createLineItem(lineItem: PartialLineItem): Promise<LineItem> {
    this.validateSessionType(SessionType.LTIK, SessionType.SERVICE_KEY)
    validate<PartialLineItem>(PartialLineItemSchema, lineItem)
    const data = await this.requestHandler.post(this.serviceAuthorization, '/api/lineitems', lineItem)
    return validate<LineItem>(LineItemSchema, data)
  }

  public async getLineItemById(id: string): Promise<LineItem> {
    this.validateSessionType(SessionType.LTIK, SessionType.SERVICE_KEY)
    const lineItemPath = `/api/lineitems/${encodeURIComponent(id)}`
    const data = await this.requestHandler.get(this.serviceAuthorization, lineItemPath)
    return validate<LineItem>(LineItemSchema, data)
  }

  public async updateLineItemById(id: string, lineItem: PartialLineItem): Promise<LineItem> {
    this.validateSessionType(SessionType.LTIK, SessionType.SERVICE_KEY)
    validate<PartialLineItem>(PartialLineItemSchema, lineItem)
    const lineItemPath = `/api/lineitems/${encodeURIComponent(id)}`
    const data = await this.requestHandler.put(this.serviceAuthorization, lineItemPath, lineItem)
    return validate<LineItem>(LineItemSchema, data)
  }

  public async deleteLineItemById(id: string): Promise<void> {
    this.validateSessionType(SessionType.LTIK, SessionType.SERVICE_KEY)
    const lineItemPath = `/api/lineitems/${encodeURIComponent(id)}`
    await this.requestHandler.delete(this.serviceAuthorization, lineItemPath)
  }

  public async getScores(lineItemId: string, filters?: ScoresFilter): Promise<ScoreContainer> {
    this.validateSessionType(SessionType.LTIK, SessionType.SERVICE_KEY)
    if (filters !== undefined) validate<ScoresFilter>(ScoresFilterSchema, filters)
    const scoresPath = `/api/lineitems/${encodeURIComponent(lineItemId)}/scores`
    const data = await this.requestHandler.get(this.serviceAuthorization, scoresPath)
    return validate<ScoreContainer>(ScoreContainerSchema, data)
  }

  public async submitScore(lineItemId: string, score: PartialScore): Promise<void> {
    this.validateSessionType(SessionType.LTIK, SessionType.SERVICE_KEY)
    validate<PartialScore>(PartialScoreSchema, score)
    const scoresPath = `/api/lineitems/${encodeURIComponent(lineItemId)}/scores`
    await this.requestHandler.post(this.serviceAuthorization, scoresPath, score)
  }

  public async getRegistrationRequestById(id: string): Promise<RegistrationRequest> {
    const registrationPath = `/api/registrations/${id}`
    const data = await this.requestHandler.get(this.bearerAuthorization, registrationPath)
    return validate<RegistrationRequest>(RegistrationRequestSchema, data)
  }

  public async completeRegistrationRequest(id: string, options: RegistrationOptions): Promise<RegistrationCompletion> {
    validate<RegistrationOptions>(RegistrationOptionsSchema, options)
    const registrationPath = `/api/registrations/${id}/complete`
    const data = await this.requestHandler.post(this.bearerAuthorization, registrationPath, options)
    return validate<RegistrationCompletion>(RegistrationCompletionSchema, data)
  }
}
