import { z } from "zod"

const contactDetailsSchema = z.object({
  email: z.string().optional().default(""),
  callingCode: z.string().default("+91"),
  mobile: z.string(),
})

const addressSchema = z.object({
  detail: z.string(),
})

const registrationDetailsSchema = z.object({
  number: z.string(),
  date: z.date(),
})

export default z.object({
  status: z
    .enum(["DISPATCHED", "ADDRESS_SHARED", "DELIVERED"])
    .default("DISPATCHED"),
  isMotorcycleDelivered: z.boolean().default(false),
  expectedDate: z.date().or(z.string()),
  preferredTimeSlot: z.string(),
  preferredDate: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  preferenceStatus: z
    .enum(["PENDING", "APPROVED", "REJECTED"])
    .default("PENDING"),
  name: z.string(),
  contactDetails: contactDetailsSchema,
  address: addressSchema,
  instructions: z.string(),
  request: z.string(),
  registrationDetails: registrationDetailsSchema,
})
