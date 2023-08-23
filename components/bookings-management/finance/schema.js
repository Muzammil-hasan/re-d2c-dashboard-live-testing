import { z } from "zod"

export default z.object({
  isFinanceRequired: z.boolean({ required_error: "Finance required" }),
  loanStatus: z.string({ required_error: "Status required" }),
  disbursementLetterUrl: z.string({
    required_error: "Disbursement letter url required",
  }),
  financier: z.string({ required_error: "Financier required" }),
  caseFileNumber: z.string({ required_error: "Case file number required" }),
  tenure: z.string({ required_error: "Tenure required" }),
  isDisbursementCompleted: z.boolean({
    required_error: "Disbursement completed required",
  }),
  loanAmount: z.number({ required_error: "Loan amount required" }),
  paymentLink: z.string({ required_error: "Payment link required" }),
})
