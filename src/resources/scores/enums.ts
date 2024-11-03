export const ActivityProgress = {
  INITIALIZED: 'Initialized',
  STARTED: 'Started',
  IN_PROGRESS: 'InProgress',
  SUBMITTED: 'Submitted',
  COMPLETED: 'Completed',
} as const

export const GradingProgress = {
  FULLY_GRADED: 'FullyGraded',
  PENDING: 'Pending',
  PENDING_MANUAL: 'PendingManual',
  FAILED: 'Failed',
  NOT_READY: 'NotReady',
} as const
