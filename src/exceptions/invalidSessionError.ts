import type { SessionType } from '@client/enums'

export class InvalidSessionError extends Error {
  public readonly currentSession: SessionType
  public readonly requiredSession: SessionType
  constructor(currentSession: SessionType, requiredSession: SessionType) {
    const message = `Operation requires authorization with the "${requiredSession}" token, please provide the required token during initialization.`
    super(message)
    this.currentSession = currentSession
    this.requiredSession = requiredSession
  }
}
