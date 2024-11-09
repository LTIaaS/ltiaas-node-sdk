import { z } from 'zod'
import { LTILaunchType } from '@resources/idtoken/enums'

export const RegistrationRequestSchema = z.object({
  url: z.string(),
  familyCode: z.string(),
  version: z.string(),
  supportedScopes: z.array(z.string()),
  supportedMessages: z.array(
    z.object({
      type: z.nativeEnum(LTILaunchType),
      placements: z.array(z.string()).optional(),
    }),
  ),
})

export const RawRegistrationRequestSchema = z.object({
  openIdConfiguration: z
    .object({
      issuer: z.string(),
      authorization_endpoint: z.string(),
      token_endpoint: z.string(),
      token_endpoint_auth_methods_supported: z.array(z.string()),
      token_endpoint_auth_signing_alg_values_supported: z.array(z.string()),
      jwks_uri: z.string(),
      registration_endpoint: z.string(),
      scopes_supported: z.array(z.string()),
      response_types_supported: z.array(z.string()),
      subject_types_supported: z.array(z.string()),
      id_token_signing_alg_values_supported: z.array(z.string()),
      claims_supported: z.array(z.string()),
      'https://purl.imsglobal.org/spec/lti-platform-configuration': z.object({
        messages_supported: z.array(
          z.object({
            type: z.string(),
            placements: z.array(z.string()).optional(),
          }),
        ),
        product_family_code: z.string().optional(),
        version: z.string().optional(),
        variables: z.array(z.string()).optional(),
      }),
      authorization_server: z.string().optional(),
    })
    .passthrough(),
  registrationToken: z.string(),
})

export const RegistrationOptionsSchema = z.object({
  platformName: z.string().optional(),
  autoActivate: z.boolean().optional(),
  messages: z
    .array(
      z.object({
        type: z.string(),
        placements: z.array(z.string()).optional(),
      }),
    )
    .optional(),
})

export const RegistrationCompletionSchema = z.object({
  html: z.string(),
  platformId: z.string(),
})
