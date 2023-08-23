"use client"

import { Dialog } from "@headlessui/react"

import { cn } from "~/lib/utils"

import styles from "./dialog.module.scss"

export function MyDialog({ isOpen, setIsOpen, children, className }) {
  return (
    <Dialog
      as="div"
      open={isOpen}
      className={`${styles.dialog}`}
      onClose={() => setIsOpen(false)}
    >
      <div className={styles["dialog_outer-layer"]}>
        <div className={styles["dialog_inner-layer"]}>
          <Dialog.Panel className={cn(styles.dialog_panel, className)}>
            {children}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  )
}
