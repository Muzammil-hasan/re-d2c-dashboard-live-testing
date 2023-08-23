import React from "react"
import { Popover as HPopover } from "@headlessui/react"

import { cn } from "~/lib/utils"

import styles from "./popover.module.scss"

const Popover = React.forwardRef(({ children, className, ...props }, ref) => (
  <HPopover ref={ref} className={cn("position-relative", className)} {...props}>
    {children}
  </HPopover>
))

Popover.displayName = "Popover"

const PopoverTrigger = React.forwardRef(
  ({ children, className, ...props }, ref) => (
    <HPopover.Button ref={ref} as="div" className={className} {...props}>
      {children}
    </HPopover.Button>
  )
)

PopoverTrigger.displayName = "PopoverTrigger"

const PopoverContent = React.forwardRef(
  ({ children, className, ...props }, ref) => (
    <HPopover.Panel
      ref={ref}
      className={cn(styles.popover, className)}
      {...props}
    >
      {children}
    </HPopover.Panel>
  )
)

PopoverContent.displayName = "PopoverContent"

export { Popover, PopoverContent, PopoverTrigger }
