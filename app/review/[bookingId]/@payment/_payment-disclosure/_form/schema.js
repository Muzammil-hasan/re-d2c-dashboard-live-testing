import { z } from "zod"

export default z.discriminatedUnion("isPaymentCompleted", [
  z.object({
    guid: z.string({ required_error: "GUID required" }),
    isPaymentCompleted: z.literal(false),
    paymentLink: z.string({ required_error: "Link is required" }),
  }),
  z.object({
    isPaymentCompleted: z.literal(true),
    guid: z.string({ required_error: "GUID required" }),
    paymentLink: z.string().default(""),
  }),
])
