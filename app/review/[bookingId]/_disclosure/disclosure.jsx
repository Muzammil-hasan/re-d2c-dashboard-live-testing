"use client"

import { forwardRef } from "react"
import { Disclosure as HDisclosure } from "@headlessui/react"

import { cn } from "~/lib/utils"

import styles from "./disclosure.module.scss"

const Disclosure = forwardRef(({ children }, ref) => {
  return <HDisclosure ref={ref}>{children}</HDisclosure>
})

Disclosure.displayName = "Disclosure"

const DisclosureButton = forwardRef(
  ({ children, className, open, ...props }, ref) => {
    return (
      <HDisclosure.Button
        ref={ref}
        className={cn(styles.accordion_btn, open && styles.open, className)}
        {...props}
      >
        {children}
      </HDisclosure.Button>
    )
  }
)

DisclosureButton.displayName = "DisclosureButton"

const DisclosurePanel = forwardRef(({ children, ...props }, ref) => {
  return (
    <HDisclosure.Panel ref={ref} className={styles.accordion_panel} {...props}>
      {children}
    </HDisclosure.Panel>
  )
})

DisclosurePanel.displayName = "DisclosurePanel"

export { Disclosure, DisclosureButton, DisclosurePanel }
