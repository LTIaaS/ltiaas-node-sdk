import type { SessionType } from '@client/enums'

export class InvalidSessionError extends Error {
  public readonly currentSession: SessionType
  public readonly allowedSessionTypes: SessionType[]
  constructor(currentSession: SessionType, allowedSessionTypes: SessionType[]) {
    super(
      `Invalid session type. Please provide one of the folowing tokens during initialization: ${allowedSessionTypes.join(', ')}`,
    )
    this.currentSession = currentSession
    this.allowedSessionTypes = allowedSessionTypes
  }
}
