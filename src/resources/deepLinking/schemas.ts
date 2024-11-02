import { z } from 'zod'
import { ContentItemType } from '@resources/deepLinking/enums'

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

export const ContentItemsSchema = z.array(ContentItemSchema)

export const DeepLinkingOptionsSchema = z
  .object({
    message: z.string().optional(),
    log: z.string().optional(),
    errMessage: z.string().optional(),
    errLog: z.string().optional(),
  })
  .refine(data => {
    return !(
      (data.message !== undefined || data.log !== undefined) &&
      (data.errMessage !== undefined || data.errLog !== undefined)
    )
  }, 'Cannot send both success and error messages or logs.')

export const DeepLinkingFormResponseSchema = z.object({
  form: z.string(),
})

export const DeepLinkingFormComponentsSchema = z.object({
  message: z.string(),
  target: z.string(),
})
