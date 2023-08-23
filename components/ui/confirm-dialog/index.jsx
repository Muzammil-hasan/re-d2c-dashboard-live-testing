"use client"

import { PiInfo } from "react-icons/pi"

import { Button } from "~/components/ui/button"
import { MyDialog } from "~/components/ui/dialog"

import styles from "./confirm-dialog.module.scss"

export default function ConfirmDialog({ open, setOpen, onConfirm }) {
  const handleClose = () => setOpen(false)

  return (
    <div>
      <MyDialog
        isOpen={open}
        setIsOpen={setOpen}
        className={styles.confirm_dialog}
      >
        <PiInfo />
        <p className={styles.label}>
          Are you sure you want to reject the request?
        </p>
        <div className={styles.confirm_dialog__ctas}>
          <Button size={"large"} onClick={onConfirm}>
            Yes
          </Button>
          <Button variant={"accent"} size={"large"} onClick={handleClose}>
            No
          </Button>
        </div>
      </MyDialog>
    </div>
  )
}
