"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "~/lib/utils"

import styles from "./label.module.scss"

const Label = React.forwardRef(({ className, muted, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(styles.label, muted && styles.muted, className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
