import { z } from 'zod'

export const LTIVersion = {
  LTI_1_3: '1.3.0',
  LTI_1_2: '1.2.0',
  LTI_1_1: '1.1.1',
} as const

export const LTILaunchType = {
  CORE: 'LtiResourceLinkRequest',
  DEEP_LINKING: 'LtiDeepLinkingRequest',
} as const

export const IDTokenSchema = z.object({
  ltiVersion: z.nativeEnum(LTIVersion),
  user: z.object({
    id: z.string(),
    roles: z.array(z.string()),
    name: z.string().optional(),
    email: z.string().optional(),
    givenName: z.string().optional(),
    familyName: z.string().optional(),
    roleScopeMentor: z.array(z.string()).optional(),
  }),
  platform: z.object({
    id: z.string(),
    url: z.string(),
    clientId: z.string(),
    deploymentId: z.string(),
    name: z.string(),
    description: z.string().optional(),
    guid: z.string().optional(),
    contactEmail: z.string().optional(),
    version: z.string().optional(),
    productFamilyCode: z.string().optional(),
    lis: z.array(z.string()).optional(),
  }),
  launch: z.object({
    type: z.nativeEnum(LTILaunchType),
    target: z.string(),
    context: z
      .object({
        id: z.string(),
        type: z.string(),
        label: z.string().optional(),
        title: z.string().optional(),
      })
      .optional(),
    resourceLink: z
      .object({
        id: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
      })
      .optional(),
    custom: z.array(z.string()).optional(),
    presentation: z
      .object({
        documentTarget: z.string().optional(),
        width: z.string().optional(),
        height: z.string().optional(),
        returnUrl: z.string().optional(),
        locale: z.string().optional(),
      })
      .optional(),
  }),
  services: z.object({
    outcomes: z.object({
      available: z.boolean(),
    }),
    deepLinking: z.object({
      available: z.boolean(),
      acceptTypes: z.array(z.string()),
      acceptPresentationDocumentTargets: z.array(z.string()),
      acceptMediaTypes: z.array(z.string()).optional(),
      acceptMultiple: z.boolean().optional(),
      title: z.string().optional(),
      text: z.string().optional(),
    }),
    assignmentAndGrades: z.object({
      available: z.boolean(),
      scopes: z.array(z.string()),
      lineItemId: z.string().optional(),
    }),
    namesAndRoles: z.object({
      available: z.boolean(),
    }),
    serviceKey: z.string().optional(),
  }),
})
export type IDToken = z.infer<typeof IDTokenSchema>

export const RawIDTokenSchema = z.object({
  // TODO: Add the rest of the fields
})
export type RawIDToken = z.infer<typeof RawIDTokenSchema>
