import { z } from "zod"

export default z.object({
  chassisNumber: z.string({ required_error: "Chassis number required" }),
  invoiceNumber: z.string({ required_error: "Invoice number is required" }),
})
