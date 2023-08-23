import { forwardRef, useMemo, useState } from "react"
import { BsCheckLg } from "react-icons/bs"
import { IoClose } from "react-icons/io5"

import { cn } from "~/lib/utils"

import styles from "./style.module.scss"

export const DecisionButtons = forwardRef(
  (
    {
      className,
      onApprove,
      onReject,
      type = "button",
      defaultStatus,
      ...props
    },
    ref
  ) => {
    const [status, setStatus] = useState(defaultStatus || "PENDING")

    const handleApprove = () => {
      if (typeof onApprove === "function") onApprove()
      setStatus("APPROVED")
    }
    const handleReject = () => {
      if (typeof onReject === "function") onReject()
      setStatus("REJECT")
    }

    const isPending = useMemo(() => status === "PENDING", [status])

    return (
      <div
        className={cn(
          styles.animatedMain,
          !isPending && styles.borderNone,
          className
        )}
      >
        {(status === "APPROVED" || isPending) && (
          <button
            type={type}
            ref={ref}
            onClick={handleApprove}
            className={
              status === "APPROVED" ? styles.btnCheckStyle : styles.buttonStyle
            }
            {...props}
          >
            <BsCheckLg size={22} />
          </button>
        )}
        {(status === "REJECT" || isPending) && (
          <button
            type={type}
            ref={ref}
            onClick={handleReject}
            className={
              status === "REJECT" ? styles.btnCloseStyle : styles.buttonStyle
            }
            {...props}
          >
            <IoClose size={22} />
          </button>
        )}
      </div>
    )
  }
)

DecisionButtons.displayName = "DecisionButtons"
