import { z } from "zod"

export default z.object({
  name: z.string({ required_error: "Name required" }),
  fathersName: z.string({ required_error: "Father's name required" }),
  address: z.object({
    state: z.string({ required_error: "State required" }),
    city: z.string({ required_error: "City required" }),
    detail: z.string({ required_error: "Address required" }),
  }),
  ownershipStatus: z.enum(
    ["FIRST_MOTORCYCLE", "SECOND_MOTORCYCLE", "THIRD_MOTORCYCLE"],
    { invalid_type_error: "Select valid status" }
  ),
  virtualDealer: z.object({
    area: z.string({ required_error: "Area required" }),
    email: z
      .string({ required_error: "Email required" })
      .email({ message: "Enter valid email address" }),
    callingCode: z.string({ required_error: "Calling code required" }),
    mobile: z
      .string({ required_error: "Phone number required" })
      .regex(/[789]\d{9}$/, {
        message: "Enter valid phone number",
      }),
  }),
  contactDetails: z.object({
    email: z
      .string({ required_error: "Email address required" })
      .email({ message: "Enter valid email address" }),
    callingCode: z.string().default("+91"),
    mobile: z
      .string({ required_error: "Phone number required" })
      .regex(/[789]\d{9}$/, {
        message: "Enter valid phone number",
      }),
  }),
  source: z.string({ required_error: "Source required" }),
})
