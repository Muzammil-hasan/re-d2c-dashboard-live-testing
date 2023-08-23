import { z } from "zod"

export default z.object({
  name: z.string({ required_error: "Name required" }),
  email: z
    .string({ required_error: "Email required" })
    .email({ message: "Enter valid email address" }),
  callingCode: z
    .string({ required_error: "Calling code required" })
    .default("+91"),
  phone: z
    .string({ required_error: "Phone number required" })
    .regex(/[789]\d{9}$/, {
      message: "Enter valid phone number",
    }),
  startTime: z.any(),
  endTime: z.any(),
  status: z.enum(["PENDING", "COMPLETED"]),
  expectedDate: z
    .string({ required_error: "Expected date required" })
    .or(z.date()),
  expectedTimeSlot: z
    .string({ required_error: "Expected time required" })
    .optional(),
  address: z.object({
    detail: z.string({ required_error: "Address required" }),
  }),
  isFixationCompleted: z.boolean().default(false),
})
