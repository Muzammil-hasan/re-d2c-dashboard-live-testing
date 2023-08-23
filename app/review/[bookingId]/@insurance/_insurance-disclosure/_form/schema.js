import { z } from "zod"

const insuranceDocSchema = z.object({
  path: z.string(),
  name: z.string(),
  ext: z.string(),
  size: z.string(),
})

export default z.discriminatedUnion("insuranceType", [
  z.object({
    insuranceType: z.literal("SELF_PURCHASED"),
    policyNumber: z.string({ required_error: "Policy number required" }),
    amount: z.string().or(z.number()),
    policyCoverFile: insuranceDocSchema,
  }),
  z.object({
    insuranceType: z.literal("RE_PURCHASED"),
    isPaymentSuccessful: z.boolean().default(false),
    policyNumber: z.string({ required_error: "Policy number required" }),
    policyCoverFile: insuranceDocSchema.partial(),
    amount: z.string().or(z.number()),
  }),
])
