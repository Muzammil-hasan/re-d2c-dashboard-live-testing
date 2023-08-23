import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"

import { cn } from "~/lib/utils"

import styles from "./button.module.scss"

const buttonVariants = cva(styles.btn, {
  variants: {
    variant: {
      outline: styles.btn_outline,
      light: styles.btn_light,
      accent: styles.btn_accent,
      accent_light: styles.btn_accent_light,
      count: styles.btn_count,
      link: styles.btn_link,
      none: "",
    },
    size: {
      icon: styles.btn_icon,
      small: styles.btn_small,
      regular: styles.btn_regular,
      wide: styles.btn_wide,
      large: styles.btn_large,
      snug: styles.btn_snug,
      snug_wide: styles.btn_snug_wide,
      rounded: styles.btn_rounded,
    },
  },
  defaultVariants: {
    variant: "outline",
    size: "regular",
  },
})

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
