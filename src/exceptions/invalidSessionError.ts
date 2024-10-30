import type { SessionType } from '@client/enums'

export class InvalidSessionError extends Error {
  public readonly currentSession: SessionType
  public readonly requiredSession: SessionType
  constructor(currentSession: SessionType, requiredSession: SessionType) {
    const message = `Operation requires session to use ${requiredSession} token, current session uses ${currentSession} token.`
    super(message)
    this.currentSession = currentSession
    this.requiredSession = requiredSession
  }
}
