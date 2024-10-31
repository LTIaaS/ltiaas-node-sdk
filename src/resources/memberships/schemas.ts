import { z } from 'zod'

export const MembershipSchema = z
  .object({
    userId: z.string(),
    roles: z.array(z.string()),
    status: z.string().optional(),
    email: z.string().optional(),
    name: z.string().optional(),
    givenName: z.string().optional(),
    familyName: z.string().optional(),
    middleName: z.string().optional(),
    picture: z.string().optional(),
    lisPersonSourcedid: z.string().optional(),
    lti11LegacyUserId: z.string().optional(),
  })
  .passthrough()

export const MembershipContainerSchema = z.object({
  id: z.string(),
  context: z.object({
    id: z.string(),
    label: z.string().optional(),
    title: z.string().optional(),
  }),
  members: z.array(MembershipSchema),
})
