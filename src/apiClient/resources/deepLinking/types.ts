import { z } from 'zod'

export const ContentItemType = {
  LTI_RESOURCE_LINK: 'ltiResourceLink',
  LINK: 'link',
  HTML_FRAGMENT: 'html',
  FILE: 'file',
  IMAGE: 'image',
} as const

const LTIResourceLinkContentItemSchema = z
  .object({
    type: z.literal(ContentItemType.LTI_RESOURCE_LINK),
    url: z.string().url().optional(),
    title: z.string().optional(),
    text: z.string().optional(),
    icon: z
      .object({
        url: z.string().url(),
        width: z.number().positive(),
        height: z.number().positive(),
      })
      .optional(),
    thumbnail: z
      .object({
        url: z.string().url(),
        width: z.number().positive(),
        height: z.number().positive(),
      })
      .optional(),
    available: z
      .object({
        startDateTime: z.string().datetime({ offset: true }).optional(),
        endDateTime: z.string().datetime({ offset: true }).optional(),
      })
      .optional(),
    submission: z
      .object({
        startDateTime: z.string().datetime({ offset: true }).optional(),
        endDateTime: z.string().datetime({ offset: true }).optional(),
      })
      .optional(),
    iframe: z
      .object({
        width: z.number().positive().optional(),
        height: z.number().positive().optional(),
      })
      .optional(),
    window: z
      .object({
        targetName: z.string().optional(),
        width: z.number().positive().optional(),
        height: z.number().positive().optional(),
        windowFeatures: z.string().optional(),
      })
      .optional(),
    custom: z.record(z.string(), z.string().or(z.number())).optional(),
  })
  .passthrough()

const LinkContentItemSchema = z
  .object({
    type: z.literal(ContentItemType.LINK),
    url: z.string().url(),
    title: z.string().optional(),
    text: z.string().optional(),
    icon: z
      .object({
        url: z.string().url(),
        width: z.number().positive(),
        height: z.number().positive(),
      })
      .optional(),
    thumbnail: z
      .object({
        url: z.string().url(),
        width: z.number().positive(),
        height: z.number().positive(),
      })
      .optional(),
    embed: z
      .object({
        html: z.string().optional(),
      })
      .optional(),
    iframe: z
      .object({
        width: z.number().positive().optional(),
        height: z.number().positive().optional(),
      })
      .optional(),
    window: z
      .object({
        targetName: z.string().optional(),
        width: z.number().positive().optional(),
        height: z.number().positive().optional(),
        windowFeatures: z.string().optional(),
      })
      .optional(),
  })
  .passthrough()

const FileContentItemSchema = z
  .object({
    type: z.literal(ContentItemType.FILE),
    url: z.string().url(),
    title: z.string().optional(),
    text: z.string().optional(),
    icon: z
      .object({
        url: z.string().url(),
        width: z.number().positive(),
        height: z.number().positive(),
      })
      .optional(),
    thumbnail: z
      .object({
        url: z.string().url(),
        width: z.number().positive(),
        height: z.number().positive(),
      })
      .optional(),
    expiresAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough()

const ImageContentItemSchema = z
  .object({
    type: z.literal(ContentItemType.IMAGE),
    url: z.string().url(),
    title: z.string().optional(),
    text: z.string().optional(),
    icon: z
      .object({
        url: z.string().url(),
        width: z.number().positive(),
        height: z.number().positive(),
      })
      .optional(),
    thumbnail: z
      .object({
        url: z.string().url(),
        width: z.number().positive(),
        height: z.number().positive(),
      })
      .optional(),
    width: z.number().positive().optional(),
    height: z.number().positive().optional(),
  })
  .passthrough()

const HTMLFragmentContentItemSchema = z
  .object({
    type: z.literal(ContentItemType.HTML_FRAGMENT),
    html: z.string(),
    title: z.string().optional(),
    text: z.string().optional(),
  })
  .passthrough()

export const ContentItemSchema = z.union([
  LTIResourceLinkContentItemSchema,
  LinkContentItemSchema,
  FileContentItemSchema,
  ImageContentItemSchema,
  HTMLFragmentContentItemSchema,
])
export type ContentItem = z.infer<typeof ContentItemSchema>
