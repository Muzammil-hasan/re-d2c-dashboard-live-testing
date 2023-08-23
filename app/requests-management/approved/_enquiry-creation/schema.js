import { z } from "zod"

export default z.object({
  enquiryNumber: z.string({ required_error: "Enquiry number required" }),
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
})
