import { z } from "zod"

import { valueSchema } from "~/lib/schemas"

export default z.discriminatedUnion("status", [
  z.object({
    status: z.literal("APPROVED", { required_error: "Please select on value" }),
  }),
  z.object({
    status: z.literal("REJECTED", { required_error: "Please select on value" }),
    rejectionReason: valueSchema("Rejection reason"),
  }),
])
