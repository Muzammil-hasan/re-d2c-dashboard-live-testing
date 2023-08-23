import { z } from "zod"

export default z.object({
  searchTerm: z
    .string()
    .regex(/[789]\d{9}$/, {
      message: "Enter valid phone number or email",
    })
    .or(z.string().email({ message: "Enter valid email address" })),
})
