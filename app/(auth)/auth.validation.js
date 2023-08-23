import { z } from "zod"

import { emailSchema, valueSchema } from "~/lib/schemas"

export const authSchema = z.object({
  email: emailSchema(),
  password: valueSchema("password"),
})
