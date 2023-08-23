import { z } from "zod"

export default z.object({
  reason: z.string({
    required_error: "You need to select a notification type.",
  }),
  description: z.string({ required_error: "Description required" }),
})
