import z from "zod"

import cities from "~/json/cities.json"
import states from "~/json/states.json"

export const valueSchema = (name = "name") => {
  return z.string({ required_error: `${name} required` })
}
export const emailSchema = (name = "Email address") => {
  return z
    .string({ required_error: `${name} required` })
    .email({ message: `Please enter valid ${name}` })
}

export const mobileSchema = (name = "Phone number") => {
  return z
    .string({ required_error: `${name} required` })
    .regex(/[789]\d{9}$/, { message: `Enter valid ${name}` })
}

export const callingCode = (name = "Calling code") => {
  return z.string({ required_error: `${name} required` }).default("+91")
}

export const ownershipStatusSchema = () => {
  z.enum(["FIRST_MOTORCYCLE", "SECOND_MOTORCYCLE", "THIRD_MOTORCYCLE"], {
    invalid_type_error: "Select valid status",
  })
}

export const addressSchema = () => {
  const CITIES = cities.map((city) => city.value)
  const STATES = states.map((state) => state.value)
  return z.object({
    state: z.string(STATES, { invalid_type_error: "Select valid state" }),
    city: z.enum(CITIES, { invalid_type_error: "Select valid city" }),
    detail: z.string({ required_error: "Address details required" }),
  })
}

export const motorcycleSchema = () => {
  return z.object(
    {
      imageUrl: z.string({ required_error: "Image url required" }).url(),
      model: z.string({ required_error: "Model required" }),
      engineCapacity: z.string({ required_error: "Engine capacity required" }),
      variant: z.string({ required_error: "Variant required" }),
    },
    { required_error: "Please select a motorcycle" }
  )
}

export const amountSchema = (name) =>
  z.any().transform((value, ctx) => {
    if (typeof value !== "string") return value
    const cleanedValue = value.replace(/,/g, "")
    if (!cleanedValue) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        message: `${name} is required`,
      })
      return z.NEVER
    } else if (isNaN(cleanedValue)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Not a valid ${name}`,
      })
      return z.NEVER
    }
    return Number(cleanedValue)
  })
