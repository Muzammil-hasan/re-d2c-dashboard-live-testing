import { z } from "zod"

const amountSchema = (name) =>
  z.any().transform((value, ctx) => {
    if (typeof value !== "string") return value
    const cleanedValue = value.replace(/,/g, "")
    if (!cleanedValue) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        message: `${name} amount is required`,
      })
      return z.NEVER
    } else if (isNaN(cleanedValue)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Not a valid amount",
      })
      return z.NEVER
    }
    return Number(cleanedValue)
  })

export default z.object({
  orderId: z.string({ required_error: "Applicant id required" }),
  motorcycleDetails: z.object(
    {
      imageUrl: z.string({ required_error: "Image url required" }),
      model: z.string({ required_error: "Model required" }),
      engineCapacity: z.string({ required_error: "Engine capacity required" }),
      variant: z.string({ required_error: "Variant required" }),
    },
    { required_error: "Motorcycle model required" }
  ),
  transactionDetails: z.object({
    motorcycleAmount: amountSchema("Motorcycle"),
    bookingAmount: amountSchema("Booking"),
  }),
  applicantDetails: z.object({
    name: z.string({ required_error: "Name required" }),
    fathersName: z.string({ required_error: "Father's name required" }),
    address: z.object({
      detail: z.string({ required_error: "Address required" }),
    }),
    ownershipStatus: z.string({ required_error: "Ownership status required" }),
    contactDetails: z.object({
      email: z
        .string({ required_error: "Email required" })
        .email({ message: "Enter valid email address" }),
      callingCode: z.string().default("+91"),
      mobile: z
        .string({ required_error: "Phone number required" })
        .regex(/[789]\d{9}$/, {
          message: "Enter valid phone number",
        }),
    }),
    source: z.string({ required_error: "Source required" }),
  }),
})
