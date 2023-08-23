import { z } from "zod"

const InvoiceDocSchema = z.object({
  path: z.string(),
  name: z.string(),
  ext: z.string(),
  size: z.string(),
})

const InvoiceSchema = z.object({
  guid: z.string(),
  chassisNumber: z
    .string({ required_error: "Chassis Number required" })
    .or(z.number({ required_error: "Chassis Number" })),
  invoiceNumber: z
    .string({ required_error: "Invoice Number required" })
    .or(z.number({ required_error: "Invoice Number" })),
  invoiceDoc: InvoiceDocSchema,
})

export default InvoiceSchema
