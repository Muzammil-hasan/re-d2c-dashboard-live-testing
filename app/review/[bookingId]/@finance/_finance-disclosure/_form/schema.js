import { z } from "zod"

const amountSchema = (name) =>
  z.any().transform((value, ctx) => {
    if (typeof value !== "string") return value
    if (!value) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        message: `${name} amount is required`,
      })
      return z.NEVER
    } else if (isNaN(value)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Not a valid amount",
      })
      return z.NEVER
    }
    return value
  })

export default z.discriminatedUnion("isFinanceRequired", [
  z.object({
    isFinanceRequired: z.literal(false, {
      required_error: "Please select on value",
    }),
    guid: z.string(),
    paymentLink: z.string({ required_error: "Payment link required" }),
  }),
  z.object({
    isFinanceRequired: z.literal(true, {
      required_error: "Please select on value",
    }),
    guid: z.string(),
    loanStatus: z.string({ required_error: "Status required" }),
    // disbursementLetterUrl: z.string({
    //   required_error: "Disbursement letter url required",
    // }),
    financier: z.string({ required_error: "Financier required" }),
    caseFileNumber: z.string({ required_error: "Case file number required" }),
    tenure: z.string({ required_error: "Tenure required" }),
    // isDisbursementCompleted: z.boolean({
    //   required_error: "Disbursement status required",
    // }),
    loanAmount: amountSchema("Loan"),
  }),
])
