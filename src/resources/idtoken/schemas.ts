import { z } from 'zod'
import { LTILaunchType, LTIVersion } from '@resources/idtoken/enums'

export const LTIVersionPartialSchema = z.object({
  ltiVersion: z.nativeEnum(LTIVersion),
})

export const IdTokenSchema = LTIVersionPartialSchema.extend({
  ltiVersion: z.string(),
  user: z
    .object({
      id: z.string(),
      roles: z.array(z.string()),
      name: z.string().optional(),
      email: z.string().optional(),
      givenName: z.string().optional(),
      familyName: z.string().optional(),
      roleScopeMentor: z.array(z.string()).optional(),
    })
    .passthrough(),
  platform: z
    .object({
      id: z.string().optional(),
      url: z.string().optional(),
      clientId: z.string().optional(),
      deploymentId: z.string().optional(),
      name: z.string().optional(),
      description: z.string().optional(),
      guid: z.string().optional(),
      contactEmail: z.string().optional(),
      version: z.string().optional(),
      productFamilyCode: z.string().optional(),
      lis: z.record(z.string(), z.unknown()).optional(),
      consumerKey: z.string().optional(),
    })
    .passthrough(),
  launch: z.object({
    type: z.nativeEnum(LTILaunchType),
    target: z.string().optional(),
    context: z
      .object({
        id: z.string(),
        type: z.array(z.string()).optional(),
        label: z.string().optional(),
        title: z.string().optional(),
      })
      .passthrough()
      .optional(),
    resourceLink: z
      .object({
        id: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
      })
      .passthrough()
      .optional(),
    custom: z.record(z.string(), z.unknown()).optional(),
    presentation: z
      .object({
        documentTarget: z.string().optional(),
        width: z.string().optional(),
        height: z.string().optional(),
        returnUrl: z.string().optional(),
        locale: z.string().optional(),
      })
      .passthrough()
      .optional(),
  }),
  services: z.object({
    outcomes: z.object({
      available: z.boolean(),
    }),
    deepLinking: z.object({
      available: z.boolean(),
      acceptTypes: z.array(z.string()).optional(),
      acceptPresentationDocumentTargets: z.array(z.string()).optional(),
      acceptMediaTypes: z.array(z.string()).optional(),
      acceptMultiple: z.boolean().optional(),
      title: z.string().optional(),
      text: z.string().optional(),
    }),
    assignmentAndGrades: z.object({
      available: z.boolean(),
      scopes: z.array(z.string()).optional(),
      lineItemId: z.string().optional(),
    }),
    namesAndRoles: z.object({
      available: z.boolean(),
    }),
    serviceKey: z.string().optional(),
  }),
})

export const RawIdTokenSchema = LTIVersionPartialSchema.extend({
  ltiVersion: z.literal(LTIVersion.LTI_1_3),
  iss: z.string(),
  sub: z.string(),
  aud: z.string(),
  exp: z.number(),
  iat: z.number(),
  nonce: z.string(),
  azp: z.string().optional(),
  given_name: z.string().optional(),
  family_name: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  locale: z.string().optional(),
  'https://purl.imsglobal.org/spec/lti/claim/message_type': z.nativeEnum(LTILaunchType),
  'https://purl.imsglobal.org/spec/lti/claim/deployment_id': z.string(),
  'https://purl.imsglobal.org/spec/lti/claim/target_link_uri': z.string(),
  'https://purl.imsglobal.org/spec/lti/claim/roles': z.array(z.string()),
  'https://purl.imsglobal.org/spec/lti/claim/tool_platform': z
    .object({
      guid: z.string().optional(),
      name: z.string().optional(),
      description: z.string().optional(),
      contactEmail: z.string().optional(),
      version: z.string().optional(),
      product_family_code: z.string().optional(),
      lis: z.array(z.string()).optional(),
    })
    .passthrough()
    .optional(),
  'https://purl.imsglobal.org/spec/lti/claim/context': z
    .object({
      id: z.string(),
      type: z.array(z.string()).optional(),
      label: z.string().optional(),
      title: z.string().optional(),
    })
    .passthrough()
    .optional(),
  'https://purl.imsglobal.org/spec/lti/claim/resource_link': z
    .object({
      id: z.string(),
      title: z.string().optional(),
      description: z.string().optional(),
    })
    .passthrough()
    .optional(),
  'https://purl.imsglobal.org/spec/lti/claim/launch_presentation': z
    .object({
      document_target: z.string().optional(),
      width: z.string().optional(),
      height: z.string().optional(),
      return_url: z.string().optional(),
      locale: z.string().optional(),
    })
    .passthrough()
    .optional(),
  'https://purl.imsglobal.org/spec/lti/claim/role_scope_mentor': z.array(z.string()).optional(),
  'https://purl.imsglobal.org/spec/lti/claim/custom': z.record(z.string(), z.unknown()).optional(),
  'https://purl.imsglobal.org/spec/lti/claim/lis': z.record(z.string(), z.unknown()).optional(),
}).passthrough()

export const RawOauthPayloadSchema = LTIVersionPartialSchema.extend({
  ltiVersion: z.literal(LTIVersion.LTI_1_2),
  lti_message_type: z.nativeEnum(LTILaunchType),
  resource_link_id: z.string(),
  resource_link_title: z.string().optional(),
  resource_link_description: z.string().optional(),
  user_id: z.string().optional(),
  roles: z.string().optional(),
  oauth_version: z.string().optional(),
  oauth_nonce: z.string().optional(),
  oauth_timestamp: z.string().optional(),
  oauth_consumer_key: z.string().optional(),
  context_id: z.string().optional(),
  context_label: z.string().optional(),
  context_title: z.string().optional(),
  context_type: z.string().optional(),
  lis_person_sourcedid: z.string().optional(),
  lis_course_section_sourcedid: z.string().optional(),
  lis_result_sourcedid: z.string().optional(),
  lis_outcome_service_url: z.string().optional(),
  lis_person_name_given: z.string().optional(),
  lis_person_name_family: z.string().optional(),
  lis_person_name_full: z.string().optional(),
  ext_user_username: z.string().optional(),
  lis_person_contact_email_primary: z.string().optional(),
  launch_presentation_locale: z.string().optional(),
  ext_lms: z.string().optional(),
  tool_consumer_info_product_family_code: z.string().optional(),
  tool_consumer_info_version: z.string().optional(),
  oauth_callback: z.string().optional(),
  tool_consumer_instance_guid: z.string().optional(),
  tool_consumer_instance_name: z.string().optional(),
  tool_consumer_instance_description: z.string().optional(),
  launch_presentation_document_target: z.string().optional(),
  launch_presentation_return_url: z.string().optional(),
  custom_gradebookservices_scope: z.string().optional(),
  custom_lineitems_url: z.string().optional(),
  custom_lineitem_url: z.string().optional(),
  oauth_signature_method: z.string().optional(),
}).passthrough()
