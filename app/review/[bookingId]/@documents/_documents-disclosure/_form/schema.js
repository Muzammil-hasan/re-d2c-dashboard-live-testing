import { z } from "zod"

import { valueSchema } from "~/lib/schemas"

const fileSchema = z.object({
  path: valueSchema("path"),
  name: valueSchema("name"),
  ext: valueSchema("ext"),
  size: valueSchema("size"),
})

const documentSchema = z.object({
  frontDocument: fileSchema,
  backDocument: fileSchema,
  rejectionReason: valueSchema("Reject reason"),
  status: z.enum(["pending", "approved", "reject"]),
  documentMandatory: z.boolean().default(false),
})

export default z.object({
  guid: valueSchema("guid"),
  aadharCard: documentSchema,
  rationCard: documentSchema,
  panCard: documentSchema,
  customerPhotograph: documentSchema.omit({ backDocument: true }),
  addressProof: documentSchema.omit({ backDocument: true }),
})
