export const buildBearerAuthorizationHeader = (apiKey: string): string => {
  return `Bearer ${apiKey}`
}

export const buildLtikAuthorizationHeader = (apiKey: string, ltik: string): string => {
  return `LTIK-AUTH-V2 ${apiKey}:${ltik}`
}

export const buildServiceKeyAuthorizationHeader = (apiKey: string, serviceKey: string): string => {
  return `SERVICE-AUTH-V1 ${apiKey}:${serviceKey}`
}
