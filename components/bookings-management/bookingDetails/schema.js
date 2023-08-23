import { z } from "zod"

export default z.object({
  orderId: z.string({ required_error: "Applicant id required" }),
  email: z
    .string({ required_error: "Email required" })
    .email({ message: "Enter valid email address" }),
  motorcycleDetails: z.object({
    imageUrl: z.string({ required_error: "Image url required" }),
    model: z.string({ required_error: "Model required" }),
    engineCapacity: z.string({ required_error: "Engine capacity required" }),
    variant: z.string({ required_error: "Variant required" }),
  }),
  transactionDetails: z.object({
    motorcycleAmount: z.number({
      required_error: "Motorcycle amount required",
    }),
    bookingAmount: z.number({ required_error: "Booking amount required" }),
  }),
  applicantDetails: z.object({
    name: z.string({ required_error: "Name required" }),
    fathersName: z.string({ required_error: "Father's name required" }),
    address: z.object({
      state: z.string({ required_error: "State required" }),
      city: z.string({ required_error: "City required" }),
      detail: z.string({ required_error: "Address required" }),
    }),
    ownershipStatus: z.string({ required_error: "Ownership status required" }),
    contactDetails: z.object({
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
