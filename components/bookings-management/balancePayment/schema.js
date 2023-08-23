import { z } from "zod"

export default z.object({
  paymentLink: z.string({ required_error: "Link is required" }),
})
