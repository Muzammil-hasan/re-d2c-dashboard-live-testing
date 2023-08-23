"use client"

import { forwardRef } from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { BsCheckLg } from "react-icons/bs"

import { cn } from "~/lib/utils"

import styles from "./checkbox.module.scss"

const Checkbox = forwardRef(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(styles.checkbox, className)}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={styles.indicator}>
      <BsCheckLg size={20} color="var(--foreground)" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))

Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
