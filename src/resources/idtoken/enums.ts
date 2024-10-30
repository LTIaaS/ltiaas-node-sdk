export const LTIVersion = {
  LTI_1_3: '1.3.0',
  LTI_1_2: '1.2.0',
} as const

export const LTILaunchType = {
  CORE: 'LtiResourceLinkRequest',
  DEEP_LINKING: 'LtiDeepLinkingRequest',
  LEGACY_LTI_LAUNCH: 'basic-lti-launch-request',
} as const
