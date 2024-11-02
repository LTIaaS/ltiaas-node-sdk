import type { z } from 'zod'
import type {
  MembershipSchema,
  MembershipContainerSchema,
  MembershipsFilterSchema,
} from '@resources/memberships/schemas'

export type Membership = z.infer<typeof MembershipSchema>

export type MembershipContainer = z.infer<typeof MembershipContainerSchema>

export type MembershipsFilter = z.infer<typeof MembershipsFilterSchema>
